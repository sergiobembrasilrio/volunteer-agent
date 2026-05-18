/**
 * launch-chrome-facebook.mjs
 *
 * Launches Chrome with the user's scan profile and CDP enabled on port 9222.
 * Facebook (and other sites) must already be logged in on this profile.
 *
 * Usage:
 *   node launch-chrome-facebook.mjs
 *
 * Then run:
 *   node facebook-scan.mjs
 *
 * To log into Facebook the first time:
 *   Run this script, navigate to facebook.com manually, log in.
 *   From next time, the session is saved in the profile.
 */

import { execSync, spawn } from 'child_process';
import { createConnection } from 'net';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE = 'C:\\chrome-scan-profile';   // same profile as career-ops LinkedIn scan
const PORT = 9222;

function waitForCDP(ms = 15000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + ms;
    const attempt = () => {
      const sock = createConnection(PORT, 'localhost');
      sock.once('connect', () => { sock.destroy(); resolve(); });
      sock.once('error', () => {
        sock.destroy();
        if (Date.now() < deadline) setTimeout(attempt, 500);
        else reject(new Error('CDP timeout — Chrome abriu mas sem debug. Verifique se outra instância está bloqueando.'));
      });
    };
    attempt();
  });
}

// Close existing Chrome instances
try {
  execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' });
  console.log('Chrome fechado.');
} catch {}

await new Promise(r => setTimeout(r, 2500));

// Launch with CDP + user profile (Facebook session preserved)
const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  '--no-first-run',
  '--restore-last-session',
  '--disable-session-crashed-bubble',
  '--disable-infobars',
], { detached: true, stdio: 'ignore' });
proc.unref();

console.log(`Chrome iniciado (PID ${proc.pid}), aguardando CDP na porta ${PORT}...`);
console.log(`Perfil: ${PROFILE}`);

try {
  await waitForCDP(20000);
  console.log(`\n✓ CDP ativo em localhost:${PORT}`);
  console.log('✓ Pronto para o scan do Facebook.');
  console.log('\nPróximo passo:');
  console.log('  node facebook-scan.mjs         # scan de grupos configurados');
  console.log('  node facebook-scan.mjs --all   # todos os grupos sem limite');
} catch (e) {
  console.error(`\n✗ ${e.message}`);
  process.exit(1);
}
