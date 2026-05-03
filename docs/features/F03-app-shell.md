# F03: App Shell + Navigation

## Goal

Build the persistent navigation and layout used by all three views. After this feature, the app feels like one product with three connected surfaces.

## User-facing behavior

A top navigation strip persists across all pages with three links: **PCP View**, **Clinical Reasoning**, **Network Intelligence**. The active view is visually highlighted. A small "Synthetic Data Demo" banner appears on every page. A footer shows a link to the GitHub repo.

## Files to create or modify

- `app/layout.tsx` — wraps every page; renders nav strip, banner, footer
- `components/nav.tsx` — top navigation component
- `components/synthetic-banner.tsx` — persistent banner
- `components/footer.tsx` — minimal footer with repo link
- `app/page.tsx` — landing page redirects or links to `/pcp` (the primary view)

## Implementation notes

- Use Next.js App Router conventions: `layout.tsx` wraps all routes
- Nav uses Next.js `Link` component for client-side routing
- Active state: read the current pathname with `usePathname()` from `next/navigation` and apply a different style to the active link
- Synthetic banner styling: small, top-of-page, non-intrusive, but clearly visible. Yellow or orange tinted background. Single line of text.
- Nav layout: brand mark on left (just "Pathfinder" text is fine), three nav links centered or right-aligned
- Footer: one line, "Built with Claude Code | View source on GitHub" with a link to the repo
- Mobile: nav can collapse to a simple horizontal scroll. Do not build a hamburger menu.

## Acceptance criteria

- [ ] All three routes (`/pcp`, `/reasoning`, `/network`) exist as empty pages with a placeholder heading
- [ ] Top nav strip persists on every page
- [ ] Active link is visually distinct from inactive links
- [ ] Clicking nav links does client-side navigation (no full page reload)
- [ ] Synthetic Data banner is visible on every page
- [ ] Footer is visible on every page with a working GitHub link
- [ ] `/` either redirects to `/pcp` or shows a brief landing card linking to the three views

## Dependencies

F01 (skeleton).

## Estimated time

1-2 hours.
