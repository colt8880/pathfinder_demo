# F08: README + Polish

## Goal

The README is half the deliverable for a Product Lead role at an AI-native company. It is what the hiring manager forwards to engineering. Final polish pass on visual consistency and demo-day readiness.

## User-facing behavior

A `README.md` at the repo root that explains what Pathfinder is, what is real vs mocked, how to run it, and what would come next. Plus a final pass on the deployed app: typos, spacing, broken links, console errors.

## README structure

```
# Pathfinder

One-paragraph hero: what Pathfinder is, what problem it solves, who it is for. End with the live demo URL.

## What's mocked vs. real

Honest accounting:
- EMR shell: visual mock (production would integrate via SMART on FHIR + CDS Hooks)
- Specialist directory: synthetic data, 15 entries
- Encounter notes: synthetic, written to read like real PCP documentation
- Leakage data: synthetic, 30 days, ~60 referrals
- AI inference: REAL — Anthropic API call to Claude Sonnet, with hardcoded fallback for stage reliability

## Architecture

- Next.js 14 App Router with TypeScript and Tailwind
- One API route (`/api/infer`) that calls the Anthropic API server-side
- All data in `lib/data/` as static TypeScript (no DB, no backend)
- Vercel deploy from `main`
- Built with Claude Code

## Demo walkthrough

Three views, one product. The walkthrough mirrors the strategic argument in the deck.

1. **PCP View** (`/pcp`): the moment of order entry. Pathfinder reads Tom's chart, infers shoulder sub-specialty, ranks specialists, books inline.
2. **Clinical Reasoning** (`/reasoning`): what the AI saw. Highlighted evidence phrases with clinical signal explanations. Built for skeptical clinical informaticists.
3. **Network Intelligence** (`/network`): the strategic surface. Capture rate, leakage by specialty, recommended action for the CMO.

## Running locally

```bash
git clone <repo-url>
cd pathfinder-demo
npm install
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open http://localhost:3000.

## What I'd build next

This prototype is Phase 1 (Read + Match) of a four-phase deployment. The full product roadmap:

- **Phase 2 (months 5-8)**: Schedule + close the loop. Calendar API integration, SMS outreach, navigator escalation.
- **Phase 3 (months 8-11)**: Network intelligence at scale. The dashboard becomes a SMART on FHIR launchable app for Network Strategy and CMO.
- **Phase 4 (month 11+)**: Multi-specialty expansion. Cardiology, GI, Behavioral Health.

## License

Demo project. Synthetic data. No production use.
```

## Polish checklist

- [ ] Run the app locally end to end. Click every link. Use every button. Note anything that breaks or feels off.
- [ ] Check responsive at 1024px, 1280px, 1440px. The demo is desktop, but it should not look broken.
- [ ] Open browser console. Fix any warnings or errors.
- [ ] Check Tailwind class consistency. Same spacing scale across views. Same font sizes for headers.
- [ ] Verify all three views show the Synthetic Data banner.
- [ ] Verify GitHub link in the footer works.
- [ ] Read every piece of copy on the site. Fix typos. Tighten language.
- [ ] Take a screenshot of the PCP view at 1280px and add it to the README.
- [ ] Check the deployed Vercel URL works for someone who is not signed in.
- [ ] Final commit, final push.

## Acceptance criteria

- [ ] `README.md` exists at repo root and matches the structure above
- [ ] Live demo URL works for an anonymous user
- [ ] No console errors on any page
- [ ] All three views look polished and consistent
- [ ] Screenshot in README hero
- [ ] Repository is presentable as a code sample

## Dependencies

All other features (F01-F07).

## Estimated time

2-3 hours.
