# F02: Data Layer

## Goal

Define all synthetic data and TypeScript types the prototype needs. Every view downstream reads from these files. There is no database.

## User-facing behavior

None directly. This feature is foundational.

## Files to create

- `lib/types.ts` — shared TS types
- `lib/data/patients.ts` — patient profiles
- `lib/data/notes.ts` — encounter notes for each patient
- `lib/data/specialists.ts` — specialist directory
- `lib/data/leakage.ts` — 30 days of mock referral and leakage data
- `lib/inference.ts` — hardcoded sub-specialty inference results, used as the mock fallback for F07

## Type definitions to include in `lib/types.ts`

```ts
export type Patient = {
  id: string;
  name: string;
  age: number;
  occupation: string;
  insurance: string;
  pcpRelationshipYears: number;
  chiefComplaint: string;
};

export type EncounterNote = {
  patientId: string;
  date: string;
  authorTitle: string; // e.g., "PCP, Internal Medicine"
  body: string; // plain text, written like a real PCP note
  evidencePhrases: { phrase: string; signal: string }[]; // for the reasoning view
};

export type Specialist = {
  id: string;
  name: string; // synthetic
  subSpecialty: string;
  practiceName: string;
  distanceMiles: number;
  inNetworkPayers: string[];
  nextAvailableDays: number;
  fitScore: number; // 0-100, used for ranking
};

export type ReferralEvent = {
  id: string;
  date: string;
  patientIdRedacted: string; // e.g., "P-0431"
  specialty: string;
  subSpecialty: string;
  estimatedDownstreamValue: number;
  outcome: "captured" | "leaked";
  leakedTo?: string; // out-of-network practice if leaked
};

export type InferenceResult = {
  subSpecialty: string;
  confidence: number; // 0-1
  rationale: string; // 1-2 sentences
  evidencePhrases: string[]; // phrases lifted from the note
  rankedSpecialists: Specialist[];
};
```

## Data content

**Patients** (3 total):
1. **Tom Bauer** (primary): 52, construction worker, employer PPO, 4-year PCP relationship, suspected rotator cuff tear
2. **Janet Reyes**: 64, retired teacher, Medicare Advantage, recent palpitations and shortness of breath (cardio routing case)
3. **Marcus Hill**: 38, software engineer, employer HMO, recurring abdominal pain (GI routing case)

**Encounter notes**: One per patient, 4-6 sentences each. Written in actual PCP documentation style: chief complaint, history of present illness, exam findings, assessment, plan. Tom's note must include phrases that clearly signal shoulder sub-specialty: "rotator cuff weakness," "positive Hawkins-Kennedy," "pain with overhead motion," etc. Each note has an `evidencePhrases` array mapping phrases to clinical signals.

**Specialists** (~15 total):
- 6 Orthopedic surgeons across sub-specialties (3 shoulder, 1 hip, 1 spine, 1 hand)
- 4 Cardiologists across sub-specialties (2 general, 1 EP, 1 interventional)
- 3 GI specialists
- 2 Neurologists
All names obviously synthetic ("Dr. Anika Patel," "Dr. Marcus Chen," etc.). Realistic but clearly mock distance, payer, and availability data.

**Leakage data** (~60 referrals over 30 days):
- ~30% leakage rate
- Concentrated leakage: 23 shoulder referrals leaked to "Mid-South Shoulder Group" (out-of-network)
- Realistic dollar values: $2,000-$8,000 per leaked referral
- Use redacted patient IDs ("P-0431") not names

## Implementation notes

- All data is hardcoded TS objects exported as constants
- Use realistic clinical language in notes (look up actual phrasing for rotator cuff exam findings)
- Keep specialist names synthetic but professional-sounding
- Distribute leakage so the dashboard shows a clear "23 shoulder referrals leaked to Group X" pattern (this becomes the recommended action callout in F06)

## Acceptance criteria

- [ ] All five files exist and export typed data
- [ ] `lib/types.ts` is the single source of truth for types; no duplicate type definitions elsewhere
- [ ] Tom's encounter note reads like a real PCP wrote it
- [ ] Tom's evidence phrases array contains 4-6 entries that map note phrases to "shoulder sub-specialty signal"
- [ ] Specialist directory has at least 3 shoulder sub-specialists for Tom's ranking
- [ ] Leakage data has a clear pattern that drives the F06 recommended action
- [ ] No real names anywhere
- [ ] `lib/inference.ts` returns a hardcoded `InferenceResult` for each patient

## Dependencies

F01 (skeleton must exist).

## Estimated time

3-4 hours. Most of the time is on encounter note quality.
