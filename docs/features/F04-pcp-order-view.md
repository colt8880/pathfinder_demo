# F04: PCP Order Entry View

## Goal

The most important demo surface. A mock EMR screen where the PCP enters a referral order and Pathfinder appears inline with a sub-specialty inference, ranked specialists, and an inline scheduling action. This is what closes the wedge argument.

## User-facing behavior

Page loads at `/pcp`. The user sees:

1. **Mock EMR chrome**: a horizontal patient banner at the top of the content area (Tom's name, age, DOB, MRN, insurance), a left sidebar with mock EMR navigation (Chart, Orders, Notes, Results, Messaging — non-functional, just visual), and a main content pane.
2. **Encounter note**: visible in the main pane, rendered as plain text with a header "Today's Encounter Note - PCP, Internal Medicine."
3. **Order entry field**: below the note, a text input pre-populated with "Orthopedic Surgery." Disabled or read-only is fine.
4. **Pathfinder card**: appears below the order entry field, visually distinct (subtle border, light blue tint, Pathfinder logo or name in the header). Contents:
   - "Pathfinder recommends: **Shoulder sub-specialty**" with confidence percentage
   - One-sentence rationale ("Encounter note suggests rotator cuff pathology based on weakness with overhead motion and positive impingement signs.")
   - Three ranked specialist cards stacked vertically: name, sub-specialty, practice, distance, next available, in-network indicator
   - Primary action button on the top-ranked specialist: "Schedule with Dr. X"
   - Secondary link below the cards: "View Pathfinder reasoning →" (links to `/reasoning`)
   - Tertiary link: "Override and choose manually" (does nothing, just visible)
5. **Confirmation state**: if the user clicks Schedule, the card transitions to a success state showing the appointment details and a "Done" indicator. No real scheduling happens.

## Files to create

- `app/pcp/page.tsx` — the page
- `components/emr-chrome.tsx` — patient banner + sidebar visual mock
- `components/encounter-note.tsx` — renders the note
- `components/pathfinder-card.tsx` — the inline recommendation card
- `components/specialist-row.tsx` — single specialist entry inside the card

## Implementation notes

- **For this feature, use the hardcoded inference from `lib/inference.ts`**, not the live API. F07 will swap this for the real call.
- Tom is the only patient on this view in the prototype scope. Hardcode `patientId: "tom-bauer"`.
- The Pathfinder card is the visual centerpiece. Spend time making it feel like a polished EMR card: clean spacing, clear hierarchy, a small Pathfinder logo or icon in the header, subtle but visible distinction from EMR-native UI.
- The patient banner should look like Epic-style (horizontal strip, name on the left, key facts inline)
- Sidebar nav items are visual only. Do not make them interactive.
- The confirmation state can be a simple inline state change. No modal.
- Add a small, dismissible "How this works" link at the top right of the Pathfinder card that explains what's mocked (see Out of scope below for what NOT to build into this).

## Acceptance criteria

- [ ] Page renders at `/pcp` with full EMR chrome, patient banner, encounter note visible
- [ ] Pathfinder card appears below the order entry field with sub-specialty inference, rationale, and three ranked specialists
- [ ] Top-ranked specialist has a working "Schedule" button that transitions to a confirmation state
- [ ] "View Pathfinder reasoning" link navigates to `/reasoning`
- [ ] Visual hierarchy is clear: encounter note feels like EMR, Pathfinder card feels like a polished addition that belongs there
- [ ] No console errors
- [ ] Renders correctly at 1280px viewport (the demo surface)

## Out of scope for this feature

- Real LLM call (that is F07)
- Multiple patients (alternate cases are a Later item)
- Real EMR chrome detail (Epic clone is wasted time)
- Animations beyond a simple state transition on schedule confirmation
- Mobile layout

## Dependencies

F01, F02, F03.

## Estimated time

4-5 hours.
