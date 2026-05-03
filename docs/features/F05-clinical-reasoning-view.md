# F05: Clinical Reasoning View

## Goal

Make the AI's reasoning visible. Render the encounter note with key clinical phrases highlighted and tooltipped to explain why each phrase signals a particular sub-specialty. This is the credibility view that addresses any clinical informaticist on the panel.

## User-facing behavior

Page loads at `/reasoning`. The user sees:

1. **Page header**: "Clinical Reasoning" with subhead "How Pathfinder inferred shoulder sub-specialty for Tom Bauer."
2. **Highlighted encounter note**: the same encounter note from F04, rendered with key clinical phrases visually highlighted (background tint, slight bold, hover cursor). Hovering on a highlighted phrase shows a tooltip explaining the clinical signal: e.g., "positive Hawkins-Kennedy" → "Subacromial impingement test. Strongly suggests rotator cuff pathology, signaling shoulder sub-specialty."
3. **Inference summary**: below the note, a structured panel with:
   - Inferred sub-specialty (Shoulder) and confidence percentage
   - "Evidence found" section listing the highlighted phrases with their clinical signals as a clean list
   - "Why not other sub-specialties" section listing 2-3 sub-specialties Pathfinder considered and rejected, with brief reasoning ("Hip/Knee: no findings related to lower extremity. Spine: no radicular symptoms. Hand: no distal upper extremity findings.")
4. **Footer link**: "← Back to PCP view" linking to `/pcp`

## Files to create

- `app/reasoning/page.tsx` — the page
- `components/highlighted-note.tsx` — renders the note with interactive highlights
- `components/evidence-panel.tsx` — structured breakdown below the note
- `components/highlight-tooltip.tsx` — tooltip on hover

## Implementation notes

- Use the `evidencePhrases` array from `lib/data/notes.ts` to drive highlighting
- Highlight rendering: split the note text by phrase positions, wrap each phrase in a `<mark>` or styled `<span>` with hover state
- Tooltips: native `title` attribute is too plain. Use a Tailwind-styled hover popover. A simple absolutely-positioned div triggered by hover state is enough.
- The "Why not other sub-specialties" section can be hardcoded text on the page for Tom. Future versions could come from the LLM but keep this view simple for now.
- Visual hierarchy: highlighted phrases should be obvious but not overwhelming. Light blue or yellow tint, not aggressive.

## Acceptance criteria

- [ ] Page renders at `/reasoning` with the encounter note and all highlighted phrases visible
- [ ] Hovering a highlighted phrase shows a tooltip with the clinical signal explanation
- [ ] Evidence panel below the note lists every highlighted phrase with its signal
- [ ] "Why not other sub-specialties" section is present and shows at least 3 alternatives with reasoning
- [ ] Back link to `/pcp` works
- [ ] No console errors

## Out of scope for this feature

- Editing or annotating the note
- Showing multiple patients' reasoning
- Showing the raw LLM prompt or response (that is a Later item)

## Dependencies

F01, F02, F03.

## Estimated time

2-3 hours.
