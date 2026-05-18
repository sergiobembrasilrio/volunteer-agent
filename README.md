# Volunteer-Ops

AI-powered volunteer and work exchange search system. Runs on Claude Code (or any AI CLI that follows the [open agent skill standard](https://agentskills.io)).

Inspired by and built alongside [career-ops](https://github.com/santifer/career-ops) — the same philosophy, different goal: instead of finding a job, finding authentic volunteer and work exchange experiences that trade your skills for accommodation and food.

---

## What it does

- **Scans** 10+ free platforms (Volunteers Base, HelpStay, HopperJobs, Grassroots Volunteering, NuMundo, GEN, and more) using Playwright MCP — no scripts, no code, Claude navigates like a human
- **Monitors public Facebook groups** passively for volunteer posts
- **Analyzes** every opportunity for scam signals, quality, and profile fit using a 6-level verdict system
- **Generates personalized messages** in the language of the listing (EN/ES/PT/IT/FR) that stand out
- **Tracks** your pipeline and contact history

## Philosophy

Quality over quantity. Five well-targeted applications beat fifty generic ones. Every message is written specifically for that host, references something real from their listing, and sounds like a person — not a form letter.

---

## Setup (5 minutes)

### 1. Prerequisites
- [Claude Code](https://claude.ai/code) installed
- Playwright MCP enabled in Claude Code settings
- Node.js 18+ (for PDF generation and Facebook scanning)

### 2. Clone or download
```bash
git clone https://github.com/YOUR_USERNAME/volunteer-ops
cd volunteer-ops
```

### 3. Create your profile
```bash
cp profile.template.md profile.md
```
Edit `profile.md` with your information. This is your volunteer identity — the system reads it for every analysis and message it generates.

### 4. Install dependencies (for PDF generation + Facebook scanning)
```bash
npm install
```

### 5. Configure your target regions
Open `portais.yml` and set `true` for the regions you want to scan:
```yaml
active_regions:
  europe_schengen: true
  europe_east_balkans: false
  asia_east: false          # Japan
  ...
```

### 6. Launch
```bash
cd volunteer-ops
claude
```

Then just talk to it:
- `scan` — search active regions for new opportunities
- `scan italy` — search only Italy
- `scan japan` — search only Japan
- `pipeline` — analyze all pending opportunities
- Paste any URL or listing text → automatic analysis + message

---

## Commands

| Command | What happens |
|---|---|
| `scan` | Search all `active_regions: true` portals with Playwright |
| `scan [region]` | Force search a specific region (eu, balkans, japan, sea, etc.) |
| `scan all` | Search everything regardless of config |
| `pipeline` | Process all pending items in `data/pipeline.md` |
| `contacts` | Show contact history tracker |
| Paste URL | Full analysis + message if approved |
| Paste listing text | Full analysis + message if approved |

---

## How the analysis works

Every opportunity is evaluated through `analisar_oportunidade.md` (v3.1):

- **Scam detection** — 17 critical flags, 16 medium flags. One critical = AVOID. No exceptions.
- **Hidden commercial use risk** — detects when "community" projects are really unpaid labor for paying guests
- **Profile match** — checks tasks, location, schedule, WiFi, language, and environment against your profile
- **Trust signals** — scores the host/profile posting the opportunity
- **6-level verdict:** BOA · PROMISSORA · UNCLEAR · NOT RELEVANT · AVOID · GOLPE

A message is only generated for BOA or PROMISSORA verdicts.

---

## Message quality

Every generated message answers the 6 questions that platforms say get the most replies:
1. Who are you?
2. Why THIS project specifically?
3. When exactly can you volunteer?
4. What relevant skills and experience do you have?
5. Can you provide references?
6. Do you have questions for the host?

Tone is natural and human — no cover letter language, no "I am writing to express my interest."

---

## Portals covered

**Free (no membership):** Volunteers Base · HelpStay · HopperJobs · Free Volunteering · Grassroots Volunteering · NuMundo · GEN (Global Ecovillage Network) · Ecobasa · IC.org · Permaculture Global · Idealist

**Low-cost (worth it):** WWOOF by country (~€20-40/year) · HelpX ($20/2 years)

**Paid (manual, paste here):** Workaway · Worldpackers

**Facebook public groups:** 20+ curated groups across Europe, Japan, Southeast Asia, Balkans — passive reading only

All portals organized by world region in `portais.yml`. Configure once, scan as needed.

---

## File structure

```
volunteer-ops/
├── CLAUDE.md                    ← system instructions (Claude reads this)
├── portais.yml                  ← portals + region config (customize here)
├── profile.template.md          ← copy to profile.md and fill in
├── analisar_oportunidade.md     ← analysis engine v4.0
├── fontes-gratuitas.md          ← full platform research + rankings
├── grupos-facebook.md           ← public Facebook groups to monitor
├── LICENSE                      ← MIT License
├── AUTHORS.md                   ← authorship declaration
├── modes/
│   ├── apply.md                 ← full application workflow (PDF + form fill)
│   └── enrich-profile.md        ← Gmail + web profile enrichment
├── templates/
│   └── volunteer-letter.html    ← presentation letter template
├── generate-volunteer-pdf.mjs   ← HTML → PDF generator
├── facebook-scan.mjs            ← Facebook group scanner (requires Chrome CDP)
├── launch-chrome-facebook.mjs   ← launch Chrome with personal profile
├── data/
│   ├── pipeline.md              ← pending opportunities inbox
│   ├── contacts.md              ← sent messages tracker
│   └── scan-history.tsv         ← dedup history (don't delete)
├── analyses/                    ← generated analysis reports
└── messages/                    ← generated host messages
```

Files in `data/`, `analyses/`, `messages/`, and `output/` are gitignored — your personal data stays local.

---

## Important: visa and paid work

Many platforms explicitly block requests for visa sponsorship or paid work. **Never mention this in initial contact.** The right approach is to arrive as a genuine volunteer, deliver real value, and let the relationship evolve naturally. It's a slow path, but it's the only one that works.

---

## Ethical use

- Never submit a message without reviewing it first. Claude generates, you send.
- Don't apply to opportunities where there's no real fit — hosts' time matters.
- Never automate actions on Facebook or platforms with personal accounts.

---

## Origin

Created by **[Sérgio Castro](https://github.com/castroser)** — Brazilian traveler, hostel worker, and tourism professional going nomadic in 2026. Built from firsthand experience navigating the world of volunteer and work exchange.

The system architecture was inspired by [career-ops](https://github.com/santifer/career-ops) by [santifer](https://santifer.io) — the same philosophy (quality analysis, AI-assisted, no spam) applied to authentic travel experiences instead of employment.

---

## Contributing

This system is designed to be customized. If your regions, languages, or volunteer types are different — edit `portais.yml`, `profile.md`, and `CLAUDE.md`. The AI can do the editing for you — just ask.

Issues and PRs welcome.

---

## License &amp; Copyright

Copyright © 2026 Sérgio Castro. Released under the [MIT License](LICENSE).

The system architecture pattern (CLAUDE.md-driven modes, YAML portal config, Markdown pipeline) was adopted from career-ops (MIT), with gratitude. All code, templates, analysis engine, and application workflow in this repository are original works by Sérgio Castro.
