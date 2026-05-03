# F01: Project Skeleton + Deploy

## Goal

Bootstrap a Next.js project, push to GitHub, connect to Vercel, get a live URL. Everything after this feature ships continuously.

## User-facing behavior

A single landing page at `/` that says "Pathfinder" with a one-line description. No styling beyond what Tailwind provides by default. The page exists only to confirm the deploy pipeline works.

## Files to create

- `package.json` (Next.js 14+, TypeScript, Tailwind, Anthropic SDK installed but unused for now)
- `tsconfig.json` (strict mode)
- `tailwind.config.ts`
- `postcss.config.js`
- `next.config.js`
- `.gitignore` (must include `.env.local`, `.env*.local`, `node_modules`, `.next`)
- `.env.local.example` (with `ANTHROPIC_API_KEY=` placeholder, no real key)
- `app/layout.tsx` (HTML shell, Tailwind globals)
- `app/page.tsx` (landing page)
- `app/globals.css` (Tailwind directives)

## Implementation notes

- Use `npx create-next-app@latest` with App Router, TypeScript, Tailwind, ESLint
- Install Anthropic SDK now: `npm install @anthropic-ai/sdk`
- Do not configure auth, sessions, or middleware
- Initial `app/page.tsx` can be 10 lines. Heading + paragraph. Done.
- Set up the GitHub repo as public from day one
- Connect Vercel to the repo. Set `ANTHROPIC_API_KEY` in Vercel env vars (the user will provide it)
- First deploy must succeed before this feature is marked done

## Acceptance criteria

- [ ] Repo is public on GitHub
- [ ] `npm run dev` works locally and serves at `localhost:3000`
- [ ] `npm run build` completes without errors
- [ ] Push to `main` triggers a successful Vercel deploy
- [ ] Live URL is accessible and shows the landing page
- [ ] `.env.local.example` exists and documents required env vars
- [ ] `.gitignore` correctly excludes `.env.local`

## Dependencies

None. This is the first feature.

## Estimated time

1-2 hours.
