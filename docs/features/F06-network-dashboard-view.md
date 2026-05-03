# F06: Network Dashboard View

## Goal

Show the strategic surface for the CMO and Network Strategy. Three metric tiles, a sortable table of leaked referrals, and one recommended action callout. This view is what activates the "new buying center" angle in the deck.

## User-facing behavior

Page loads at `/network`. The user sees:

1. **Page header**: "Network Intelligence" with subhead "Last 30 days." A small "Filter: All specialties" pill (non-functional placeholder for future filtering).
2. **Three metric tiles** in a horizontal row:
   - **Total referrals**: ~60 (number from leakage data), with subtext "Across 12 specialties"
   - **Capture rate**: ~70%, with subtext "20% below benchmark" in red or orange
   - **Revenue at risk**: ~$180K (sum of leaked referral values), with subtext "30 day trailing"
3. **Leakage by specialty section**: a simple horizontal bar chart or stacked table showing each specialty with a captured-vs-leaked split. Orthopedics shows the largest leak.
4. **Sortable leaked referrals table**:
   - Columns: Referral ID, Date, Specialty, Sub-specialty, Estimated value, Leaked to
   - Sortable by clicking column headers (Date, Specialty, Estimated value)
   - 20-30 rows
5. **Recommended Action callout**: a visually distinct card at the bottom:
   - Title: "Recommended Action"
   - Body: "23 shoulder referrals leaked to Mid-South Shoulder Group in the last 30 days, totaling $94,000 in lost downstream revenue. Consider hiring a fellowship-trained shoulder specialist or pursuing a partnership with the group."
   - Two buttons (visual only): "Create hiring request" and "Flag for partnership review"

## Files to create

- `app/network/page.tsx` — the page
- `components/metric-tile.tsx` — individual metric tile
- `components/leakage-by-specialty.tsx` — the bar chart or stacked table
- `components/leakage-table.tsx` — the sortable referral table
- `components/recommended-action.tsx` — the callout card

## Implementation notes

- All data comes from `lib/data/leakage.ts`
- Compute totals client-side from the leakage array. Do not hardcode aggregate numbers; derive them so they stay consistent if the data changes.
- For the leakage-by-specialty visualization, a simple horizontal stacked bar built with Tailwind divs and percentage widths is fine. Do not pull in a chart library. If pure CSS feels too tight, fall back to a clean table with captured/leaked counts and a simple progress bar per row.
- Sortable table: client-side sorting with `useState`. Click a header, sort by that column, click again to reverse.
- Recommended Action callout: orange or amber tinted background, distinct from the rest of the page. Bold title.
- The two buttons in the callout are non-functional. Add a small "Demo only" indicator on hover or below.

## Acceptance criteria

- [ ] Page renders at `/network` with all three metric tiles populated from real data
- [ ] Leakage by specialty visualization is visible and shows orthopedics as the largest leak
- [ ] Leaked referrals table renders with at least 20 rows
- [ ] Clicking column headers sorts the table
- [ ] Recommended Action callout is visible and visually distinct
- [ ] All numbers in the page are derived from `lib/data/leakage.ts`, not hardcoded
- [ ] No console errors

## Out of scope for this feature

- Date range filtering
- Geographic heatmap
- Drill-down into individual referrals
- Real chart library (Recharts, Chart.js, etc.)
- Export to CSV
- The buttons doing anything

## Dependencies

F01, F02, F03.

## Estimated time

3-4 hours.
