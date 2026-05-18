/**
 * facebook-scan.mjs — Facebook volunteer post monitor
 *
 * Connects to existing Chrome via CDP (port 9222) where Facebook is logged in.
 * Scans public groups listed in portais.yml for recent volunteer/work-exchange posts.
 * Adds relevant finds to data/pipeline.md.
 *
 * Usage:
 *   node launch-chrome-facebook.mjs   # launch Chrome first
 *   node facebook-scan.mjs            # scan a random subset of groups
 *   node facebook-scan.mjs --all      # scan all groups
 *   node facebook-scan.mjs --dry-run  # preview without writing files
 *
 * Human-like behaviour:
 *   - Random 15–35s pauses between groups
 *   - 3 slow scrolls per group to load posts
 *   - Max 4 groups per run (use --all to override)
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import yaml from 'js-yaml';

// ── Config ────────────────────────────────────────────────────────────────────

const CDP_URL       = 'http://localhost:9222';
const PORTALS_PATH  = 'portais.yml';
const HISTORY_PATH  = 'data/scan-history.tsv';
const PIPELINE_PATH = 'data/pipeline.md';
const ARGS          = process.argv.slice(2);
const DRY_RUN       = ARGS.includes('--dry-run');
const RUN_ALL       = ARGS.includes('--all');
const MAX_GROUPS    = 4;   // per run, unless --all
const PAUSE_MIN_MS  = 15_000;
const PAUSE_MAX_MS  = 35_000;
const SCROLL_PAUSE  = 2_500;
const MAX_DAYS_OLD  = 30;  // ignore posts older than this

mkdirSync('data', { recursive: true });

// ── Volunteer keyword filter ──────────────────────────────────────────────────
// A post must contain at least one POSITIVE keyword to be considered.
// If it contains a NEGATIVE keyword, it's skipped regardless.

const POSITIVE_KEYWORDS = [
  // English
  'volunteer', 'work exchange', 'help exchange', 'work for accommodation',
  'in exchange for', 'looking for help', 'seeking volunteer', 'free accommodation',
  'room and board', 'bed and board', 'wwoof', 'workaway', 'worldpackers',
  'helpx', 'helpstay', 'hostel volunteer', 'farm volunteer', 'harvest help',
  'vendemmia', 'olive harvest', 'grape harvest',
  // Spanish
  'voluntariado', 'intercambio de trabajo', 'trabajo a cambio', 'alojamiento gratis',
  'busco voluntario', 'buscamos voluntario', 'vitto e alloggio', 'en busca de',
  'a cambio de alojamiento', 'gratis a cambio',
  // Portuguese
  'voluntariado', 'troca de trabalho', 'em troca de hospedagem', 'em troca de alojamento',
  'busco voluntário', 'procuro voluntário',
  // Italian
  'volontariato', 'scambio lavoro', 'vitto e alloggio', 'cerco volontario',
  'cerchiamo volontari', 'in cambio di', 'agriturismo volontari',
  // French
  'bénévolat', 'volontariat', 'échange travail', 'logement gratuit',
  'cherche bénévole', 'en échange de logement',
];

const NEGATIVE_KEYWORDS = [
  'paid position', 'salary required', 'must have visa', 'only residents',
  'citizens only', 'work permit required', 'local only', 'no foreigners',
  'scam', 'registration fee', 'program fee', 'pay to volunteer',
];

function isRelevantPost(text) {
  const t = text.toLowerCase();
  if (NEGATIVE_KEYWORDS.some(k => t.includes(k))) return false;
  return POSITIVE_KEYWORDS.some(k => t.includes(k));
}

// ── Date filter ───────────────────────────────────────────────────────────────
// Facebook shows dates as: "2h", "3 hours ago", "Yesterday", "May 15", "2 days ago", etc.

function isRecentPost(dateText) {
  if (!dateText) return true; // unknown date — include by default

  const t = dateText.toLowerCase().trim();

  // Clearly old
  if (/\d+ (months?|years?) ago/.test(t)) return false;
  if (/\d+ weeks? ago/.test(t)) {
    const weeks = parseInt(t);
    return weeks <= 4;
  }

  // Clearly recent
  if (/just now|today|yesterday|hours? ago|minutes? ago|h$|m$|\d+h|\d+m/.test(t)) return true;
  if (/\d+ days? ago/.test(t)) {
    const days = parseInt(t);
    return days <= MAX_DAYS_OLD;
  }

  // Specific date like "May 15" — parse against current date
  try {
    const currentYear = new Date().getFullYear();
    const parsed = new Date(`${dateText} ${currentYear}`);
    if (!isNaN(parsed)) {
      const diffMs = Date.now() - parsed.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays <= MAX_DAYS_OLD;
    }
  } catch {}

  return true; // default include if can't parse
}

// ── Dedup ─────────────────────────────────────────────────────────────────────

function loadSeenIds() {
  const seen = new Set();
  if (existsSync(HISTORY_PATH)) {
    for (const line of readFileSync(HISTORY_PATH, 'utf8').split('\n')) {
      const id = line.split('\t')[1]?.trim();
      if (id) seen.add(id);
    }
  }
  return seen;
}

// ── Facebook post extraction ──────────────────────────────────────────────────

async function extractPosts(page, groupName) {
  // Scroll slowly to trigger post loading (human-like)
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'smooth' }));
    await page.waitForTimeout(SCROLL_PAUSE + Math.random() * 1000);
  }

  return page.evaluate(() => {
    const posts = [];
    const seen = new Set();

    // Facebook posts are in [role="article"] elements
    document.querySelectorAll('[role="article"]').forEach(article => {
      // Try to get a stable post ID from data attributes or URL
      const postLink = article.querySelector('a[href*="/posts/"], a[href*="/permalink/"], a[href*="?story_fbid"]');
      const postUrl = postLink?.href || null;
      const postId = postUrl ? postUrl.replace(/[?&].*$/, '') : null;

      if (postId && seen.has(postId)) return;
      if (postId) seen.add(postId);

      // Get post text content
      const textEl = article.querySelector('[data-ad-comet-preview="message"], [dir="auto"]');
      const text = textEl?.innerText?.trim() || article.innerText?.trim() || '';
      if (text.length < 30) return; // skip tiny posts

      // Get date — look for time element or aria labels with dates
      const timeEl = article.querySelector('a[aria-label], abbr[data-utime], time');
      const dateText = timeEl?.getAttribute('aria-label') ||
                       timeEl?.getAttribute('title') ||
                       timeEl?.textContent?.trim() || '';

      posts.push({ text: text.slice(0, 800), dateText, postUrl, postId });
    });

    return posts;
  }).then(posts => posts.map(p => ({ ...p, groupName })));
}

// ── Pipeline writer ───────────────────────────────────────────────────────────

function writeToPipeline(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = posts.map(p => {
    const url = p.postUrl || `facebook-group:${p.groupName}`;
    const preview = p.text.slice(0, 120).replace(/\n/g, ' ');
    return `- [ ] ${url} | Facebook | ${p.groupName} | "${preview}..."`;
  });
  const block = `\n<!-- Facebook scan ${today} -->\n` + lines.join('\n') + '\n';

  const raw = existsSync(PIPELINE_PATH) ? readFileSync(PIPELINE_PATH, 'utf8') : '';
  const marker = '## ✅ Analisadas';
  if (raw.includes(marker)) {
    writeFileSync(PIPELINE_PATH, raw.replace(marker, block + '\n' + marker), 'utf8');
  } else {
    appendFileSync(PIPELINE_PATH, block, 'utf8');
  }
}

function writeToHistory(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = posts
    .filter(p => p.postId)
    .map(p => `${today}\t${p.postId}\t${p.groupName}\tFacebook`).join('\n');
  if (lines) appendFileSync(HISTORY_PATH, '\n' + lines, 'utf8');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Load groups from portais.yml
  const config = yaml.load(readFileSync(PORTALS_PATH, 'utf8'));
  const fbGroups = config.facebook_public_groups?.grupos || [];

  if (!fbGroups.length) {
    console.log('Nenhum grupo de Facebook configurado em portais.yml.');
    process.exit(0);
  }

  const seenIds = loadSeenIds();
  let groups = [...fbGroups];

  // Shuffle + limit unless --all
  if (!RUN_ALL) {
    groups = groups.sort(() => Math.random() - 0.5).slice(0, MAX_GROUPS);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Facebook Scan — ${new Date().toISOString().slice(0, 10)}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Grupos a vasculhar: ${groups.length}${RUN_ALL ? '' : ` (de ${fbGroups.length} — use --all para todos)`}`);
  if (DRY_RUN) console.log('DRY RUN — sem escrita de ficheiros');
  console.log('');

  // Connect to Chrome via CDP
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL);
    console.log('✓ Conectado ao Chrome via CDP (:9222)');
  } catch {
    console.error('✗ Chrome não encontrado na porta 9222.');
    console.error('  Execute primeiro: node launch-chrome-facebook.mjs');
    process.exit(1);
  }

  const context = browser.contexts()[0];
  const page = await context.newPage();

  const allFound = [];
  let groupsScanned = 0;

  for (const group of groups) {
    console.log(`\n→ ${group.name}`);
    console.log(`  ${group.url}`);

    try {
      await page.goto(group.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000 + Math.random() * 2000);

      // Check if we're blocked or need login for this group
      const pageTitle = await page.title();
      const isLoginPage = pageTitle.toLowerCase().includes('log in') ||
                          pageTitle.toLowerCase().includes('facebook');
      const snapshot = await page.content();
      const hasArticles = snapshot.includes('role="article"');

      if (!hasArticles) {
        console.log(`  ⚠ Sem posts visíveis — grupo pode ser privado ou exigir login`);
        continue;
      }

      const posts = await extractPosts(page, group.name);
      groupsScanned++;

      const relevant = posts.filter(p =>
        isRelevantPost(p.text) &&
        isRecentPost(p.dateText) &&
        (!p.postId || !seenIds.has(p.postId))
      );

      console.log(`  Posts encontrados: ${posts.length} | Relevantes: ${relevant.length}`);
      relevant.forEach(p => {
        const preview = p.text.slice(0, 80).replace(/\n/g, ' ');
        console.log(`  + [${p.dateText || '?'}] ${preview}...`);
      });

      allFound.push(...relevant);

    } catch (err) {
      console.log(`  ✗ Erro: ${err.message.slice(0, 80)}`);
    }

    // Human-like pause between groups
    if (groups.indexOf(group) < groups.length - 1) {
      const pause = PAUSE_MIN_MS + Math.random() * (PAUSE_MAX_MS - PAUSE_MIN_MS);
      console.log(`  ⏱ Pausa ${Math.round(pause / 1000)}s...`);
      await page.waitForTimeout(pause);
    }
  }

  await browser.close();

  // Write results
  if (!DRY_RUN && allFound.length > 0) {
    writeToPipeline(allFound);
    writeToHistory(allFound);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Grupos visitados:     ${groupsScanned}`);
  console.log(`Posts relevantes:     ${allFound.length}`);
  if (!DRY_RUN && allFound.length > 0) {
    console.log(`\n→ Adicionados a ${PIPELINE_PATH}`);
    console.log(`→ Use Claude para analisar: pipeline`);
  }
  console.log('');
}

main().catch(err => {
  console.error('Erro fatal:', err.message);
  process.exit(1);
});
