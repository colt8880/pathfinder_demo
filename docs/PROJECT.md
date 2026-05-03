# Pathfinder Prototype: Project Overview

## What this is

A working prototype of Pathfinder, an AI-native referral routing agent built on the Qualified Health platform. The prototype intervenes at the moment a PCP enters a referral order, infers the right sub-specialty from the chart, ranks specialists by clinical fit and access, and supports inline scheduling. It also surfaces a network leakage intelligence layer for health system leadership.

The prototype is built for a Qualified Health Product Lead interview. It is a working demo, not a production product. The goal is to make the strategic argument tangible to a panel of three interviewers.

## Why this prototype exists

The interview prompt requires a "lightweight AI prototype that helps make your idea concrete." A static Figma mockup does not demonstrate AI capability. A real working app, deployed publicly, that calls a real LLM and shows an end-to-end workflow is the strongest possible answer to that prompt. It also signals that the candidate ships code, not just slides.

## Architecture at a glance

Three connected views plus one API route, all in one Next.js app:

1. **PCP Order Entry View** (`/pcp`): Mock EMR shell. Pre-populated patient. Pathfinder card appears inline at order entry with sub-specialty inference, ranked specialists, inline scheduling. This is the primary demo.
2. **Clinical Reasoning View** (`/reasoning`): The encounter note rendered with key clinical phrases highlighted and tooltipped. Shows what the AI saw and why. This is the credibility view.
3. **Network Dashboard View** (`/network`): Three metric tiles, sortable table of leaked referrals, one recommended action callout. Shows the strategic surface for CMO and Network Strategy.
4. **AI Inference API** (`/api/infer`): Server-side endpoint that calls the Anthropic API with the encounter note and returns sub-specialty, confidence, rationale, and evidence phrases. Falls back to hardcoded responses if the API is unavailable.

A top navigation strip lets the panel flip between views in real time during the demo.

## Tech stack

| Choice | Why |
|---|---|
| Next.js 14+ (App Router) | Routing for three views + API route in one app. Works with Vercel out of the box. |
| TypeScript (strict) | Signals engineering rigor without much overhead at this scope. |
| Tailwind CSS | Fastest path to consistent visual design in a 16-hour build. |
| Vercel | Free tier handles this easily. Auto-deploys from `main`. Live URL within an hour of first commit. |
| Anthropic SDK + Claude Sonnet | Sub-specialty inference is a Sonnet-class task, not Opus. Cheaper and fast enough. |
| GitHub | Public repo. The repo itself is part of the deliverable. |

## Data approach

All data is synthetic and lives in TypeScript files under `lib/data/`. No database, no backend, no real patient information.

- One primary patient (Tom, 52, suspected rotator cuff tear)
- Two or three alternate patients for "what about edge cases" questions
- Encounter notes written to read like real PCP documentation
- A specialist directory of around 15 entries with clearly synthetic names
- Thirty days of mock referral and leakage data with realistic distributions

A persistent banner on every page reads "Synthetic Data Demo" so no one mistakes this for a production tool.

## Out of scope

Things deliberately excluded. If you find yourself building one of these, stop.

- Real SMART on FHIR or CDS Hooks integration
- Real EMR authentication or session handling
- User accounts or multi-tenancy
- A database or persistence layer
- Tests (no Jest, no Playwright, no integration tests)
- Streaming LLM responses
- Geographic heatmaps or interactive charts
- Mobile-first design (desktop is the demo surface)
- Closed-loop monitoring, SMS outreach, navigator escalation (these are deployment phases 2 and 3, not the prototype)
- Multi-specialty support beyond Orthopedics

## Success criteria

The prototype is "done" when:

1. All three views are deployed at a public Vercel URL
2. The PCP view does a real Anthropic API call on first load and renders the inference result
3. The reasoning view explains the AI's evidence with highlighted phrases
4. The network dashboard shows tiles, leakage table, and recommended action
5. The README is sharp enough to forward to engineering as a code sample
6. The user can walk through all three views in 4 minutes without breaking

## Build approach

Eight features, sequenced for continuous deployability. See `/docs/BACKLOG.md` for current status and `/docs/features/` for individual specs. Estimated total build time: 16-20 hours.

The build order ensures the app is deployable after every feature. No long-lived branches. Every merge to `main` deploys a working version.
