# AGENTS.md

This file orients any AI coding agent (Claude Code, Cursor, Codex, etc.) working in this repo. Read this first, every session.

## What this project is

Pathfinder is a prototype for a Qualified Health Product Lead interview. It demonstrates an AI-native referral routing agent that intervenes at the moment of PCP order entry, ranks specialists by clinical fit, and surfaces network leakage intelligence to health system leadership.

The prototype is a single Next.js app with three connected views (PCP order entry, clinical reasoning, network dashboard) plus one API route for LLM inference. All clinical data is synthetic. Live demo deploys to Vercel from `main`.

## How to work in this repo

1. Read `/docs/BACKLOG.md` first. It lists features in build order with status.
2. Pick the top `[ ]` item under `## Now`. If `## Now` is empty, promote the top `## Next` item.
3. Open the feature spec at `/docs/features/F##-<name>.md`. Read it end to end before writing code.
4. Implement the feature. Stay within scope of the spec. If you discover the spec is wrong, update the spec first, then build.
5. Mark the backlog item `[~]` while in progress, `[x]` when acceptance criteria are met.
6. Commit with message format: `F##: <short description>`. Push to `main`. Vercel auto-deploys.
7. If you finish early or have spare context, do not pick up the next feature without checking with the user. One feature per session is the default.

## Tech stack

- **Framework**: Next.js 14+ App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (auto-deploy from `main` branch on GitHub)
- **AI**: Anthropic SDK, Claude Sonnet model, called from `/app/api/infer/route.ts`

## Code conventions

- File names: `kebab-case.tsx` for components, `kebab-case.ts` for utilities
- Component names: `PascalCase`
- Types live in `lib/types.ts` and are imported, not redefined
- All data lives in `lib/data/`. No DB, no backend, no auth.
- Tailwind utility classes inline. No separate CSS files unless absolutely needed.
- No tests. This is a 16-hour prototype, not a product.
- No state management library. React `useState` and route props are enough.

## Critical constraints

These are non-negotiable. Violating any of them creates real risk for the user.

1. **Synthetic data only.** No real patient data, ever. No real specialist names. The "Synthetic Data Demo" banner must remain visible on every page.
2. **API key safety.** `ANTHROPIC_API_KEY` lives only in `.env.local` (gitignored) and Vercel environment variables. Never commit it. Never log it.
3. **Mock fallback required.** Every LLM call must have a hardcoded fallback response. If the API key is missing or the call fails, the demo still works.
4. **No real EMR integration.** The EMR shell is a visual mock. Do not implement real SMART on FHIR or CDS Hooks plumbing. The README explains the production architecture.
5. **Stay in scope.** If a feature spec says "skip charts," skip charts. Don't gold-plate.

## Common commands

```bash
npm run dev          # Local dev server at localhost:3000
npm run build        # Production build
npm run lint         # Lint check
git push origin main # Deploys to Vercel automatically
```

Environment variables needed locally (`.env.local`):
```
ANTHROPIC_API_KEY=sk-ant-...
```

## When to ask vs decide

**Decide on your own:**
- Component file structure and decomposition
- Tailwind class choices
- TypeScript types and interfaces
- Loading and error states
- Minor UX polish

**Ask the user:**
- Anything that changes scope (adding or removing features)
- Anything that affects the demo script or panel narrative
- Anything that touches synthetic data realism (encounter notes, specialist names, leakage numbers)
- Architectural changes that contradict this file

## Communication style

The user is a senior product leader. Match that:
- Direct, peer-tone
- No filler, no fluff, no over-explanation
- No em-dashes
- Push back if the user is wrong or missing something
- Surface unsolicited suggestions only when they are genuinely high-value

## When stuck

- Re-read the feature spec
- Re-read this file
- Check `/docs/PROJECT.md` for higher-level context
- If still stuck, stop and ask the user. Do not guess.
