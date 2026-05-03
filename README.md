# Pathfinder

Pathfinder is an AI-native referral routing agent that intervenes at the moment of PCP order entry, reads the encounter note, infers the optimal sub-specialty, and ranks in-network specialists by clinical fit. For health system leadership, it surfaces network leakage intelligence and actionable recommendations to recapture downstream revenue. This is a working prototype built for a Qualified Health Product Lead interview.

<!-- TODO: Add screenshot of PCP view here -->

## What's mocked vs. real

Honest accounting of what this prototype does and does not do:

- **EMR shell**: Visual mock. Production would integrate via SMART on FHIR + CDS Hooks.
- **Specialist directory**: Synthetic data, 15 entries across orthopedics, cardiology, GI, and neurology.
- **Encounter notes**: Synthetic, written to read like real PCP documentation with accurate clinical language.
- **Leakage data**: Synthetic. 30 days, 60 referrals, 30% leakage rate with a concentrated shoulder pattern.
- **AI inference**: REAL. Anthropic API call to Claude Sonnet, with a hardcoded fallback for stage reliability.

## Architecture

- Next.js 16 App Router with TypeScript (strict mode) and Tailwind CSS v4
- One API route (`/api/infer`) that calls the Anthropic API server-side
- All data in `lib/data/` as static TypeScript objects (no DB, no backend, no auth)
- Vercel deploy from `main`
- Built with [Claude Code](https://claude.ai/claude-code)

## Demo walkthrough

Three views, one product. The walkthrough mirrors the strategic argument in the deck.

1. **PCP View** (`/pcp`): The moment of order entry. Pathfinder reads Tom's chart, infers shoulder sub-specialty at 94% confidence, ranks three in-network specialists, and books inline.
2. **Clinical Reasoning** (`/reasoning`): What the AI saw. The encounter note with highlighted evidence phrases and tooltip explanations of each clinical signal. Built for skeptical clinical informaticists.
3. **Network Intelligence** (`/network`): The strategic surface. Capture rate, revenue at risk, leakage by specialty, and a recommended action identifying 18 shoulder referrals leaked to a single out-of-network group.

## Running locally

```bash
git clone https://github.com/colt8880/pathfinder_demo.git
cd pathfinder_demo
npm install
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open http://localhost:3000. The demo works without an API key (falls back to hardcoded inference).

## What I'd build next

This prototype is Phase 1 (Read + Match) of a four-phase deployment. The full product roadmap:

- **Phase 2 (months 5-8)**: Schedule + close the loop. Calendar API integration, SMS outreach, navigator escalation.
- **Phase 3 (months 8-11)**: Network intelligence at scale. The dashboard becomes a SMART on FHIR launchable app for Network Strategy and CMO.
- **Phase 4 (month 11+)**: Multi-specialty expansion. Cardiology, GI, Behavioral Health routing with specialty-specific prompt tuning.

## License

Demo project. Synthetic data only. No production use.
