# Pathfinder

Pathfinder is an AI-native referral routing agent that intervenes at the moment of PCP order entry, reads the encounter note, infers the optimal sub-specialty, and ranks in-network specialists by clinical fit. For health system leadership, it surfaces network leakage intelligence and actionable recommendations to recapture downstream revenue. This is a working prototype built for a Qualified Health Product Lead interview.

<!-- TODO: Add screenshot of PCP view here -->

## What's mocked vs. real

Honest accounting of what this prototype does and does not do:

- **EMR shell**: Visual mock. Production would integrate via SMART on FHIR + CDS Hooks.
- **Specialist directory**: Synthetic data, 15 entries across orthopedics, cardiology, GI, and neurology.
- **Encounter notes**: Synthetic, written to read like real PCP documentation with accurate clinical language. Sectioned by S/O/A/P with highlightable evidence phrases.
- **Leakage data**: Synthetic. 30 days, 60 referrals, 30% leakage rate with a concentrated shoulder pattern.
- **AI inference**: REAL. Anthropic API call to Claude Sonnet, with a hardcoded fallback for stage reliability. Rate-limited to 10 requests per IP per hour; falls back to mock silently after that.
- **Scheduling flow**: Visual mock. Inline slot picker and confirmation state simulate the booking experience.

## Design system

The UI follows the **Operator design system**: dense, neutral-grayscale with three semantic accents (signal blue, positive green, halt red). Inter for text, JetBrains Mono for all numerics. Every number a user might compare or parse uses monospaced tabular figures. Sentence case in chrome, uppercase tracking only for eyebrow labels and table headers.

Component primitives (`components/ui/`): Button, Badge, Card, ConfidenceMeter. Icons via Lucide React.

## Architecture

- Next.js 16 App Router with TypeScript (strict mode) and Tailwind CSS v4
- Operator design tokens in `app/globals.css` (CSS custom properties)
- One API route (`/api/infer`) that calls the Anthropic API server-side, with IP rate limiting and mock fallback
- All data in `lib/data/` as static TypeScript objects (no DB, no backend, no auth)
- Vercel deploy from `main`
- Built with [Claude Code](https://claude.ai/claude-code) and [Claude Design](https://claude.ai/design)

## Demo walkthrough

A guided tour appears on first visit (reopen anytime via the pulsing ? icon in the header). After the tour, a sequential nudge flow highlights the next action at each step.

Three views, one product:

1. **PCP order entry** (`/pcp`): Two-column layout. Encounter note on the left with S/O/A/P sections. Referral order and "Run Pathfinder" trigger on the right. Clicking Run Pathfinder calls Claude Sonnet in real time. Results appear full-width below: inferred sub-specialty with confidence meter, evidence chips, and a ranked specialist table with fit scores, availability, and inline scheduling.
2. **Clinical reasoning** (`/reasoning`): The encounter note with all evidence phrases highlighted and mapped to clinical signals. Right panel shows inference summary, confidence meter, ICD/CPT codes, evidence list, and rejected sub-specialties with reasoning.
3. **Network intelligence** (`/network`): Three stat cards (referrals, leakage rate, revenue at risk) with mono numerics and delta badges. Recommended action callout identifying concentrated leakage to a single out-of-network group. Sortable leaked referrals table.

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
