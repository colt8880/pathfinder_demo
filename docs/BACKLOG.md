# Pathfinder Build Backlog

This is the source of truth for what to build next. Update it as work progresses.

## Status legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Done

## Now

The current feature in active development. One at a time.

- [~] **F03: App Shell + Navigation** — `/docs/features/F03-app-shell.md`

## Next

Queued in build order. Pull from the top when `## Now` is empty.

- [ ] **F04: PCP Order Entry View** — `/docs/features/F04-pcp-order-view.md`
- [ ] **F05: Clinical Reasoning View** — `/docs/features/F05-clinical-reasoning-view.md`
- [ ] **F06: Network Dashboard View** — `/docs/features/F06-network-dashboard-view.md`
- [ ] **F07: AI Inference API** — `/docs/features/F07-ai-inference-api.md`
- [ ] **F08: README + Polish** — `/docs/features/F08-readme-and-polish.md`

## Later

Optional polish items. Only pick these up if F01-F08 are complete and there is build time remaining.

- [ ] Add 2-3 alternate patient cases accessible via a "Try another case" link
- [ ] Add a "View AI input/output" toggle on the PCP view that exposes the prompt and raw response
- [ ] Add a small confidence visualization (bar or ring) on the Pathfinder card
- [ ] Add a screenshot to the README hero
- [ ] Record a short Loom walkthrough and link from README

## Done

Move features here as they complete. Most recent at top.

- [x] **F02: Data Layer**
- [x] **F01: Project Skeleton + Deploy**

## Build order rationale

The order is `F01 → F02 → F03 → F04 → F05 → F06 → F07 → F08`. The reasoning:

- **F01 first** so we get a live URL on day one. Continuous deploy from the start.
- **F02 second** because every view depends on it. Static data is faster than building it as you go.
- **F03 third** because all views need the navigation shell.
- **F04 fourth** because it is the most important demo surface. Get the wedge live early.
- **F05 fifth** because it builds on F04's data and patient context.
- **F06 sixth** because it is mostly independent and can ship later in the sequence.
- **F07 last among build features** because the mocked data from F02 keeps the demo working without a real LLM call. Wire the real call once everything else is solid. This minimizes the time the demo is in a broken state.
- **F08 final** because the README writes itself once the product is built.

## When to deviate

Deviate from this order if a feature reveals a blocking gap. For example, if F04 reveals the data layer is missing a field, fix F02 before continuing F04. Update both specs to match reality.
