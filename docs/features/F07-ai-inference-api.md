# F07: AI Inference API

## Goal

Replace the hardcoded inference in the PCP view with a real Anthropic API call. Keep the hardcoded mock as a fallback so the demo never breaks on stage. This feature is what makes the prototype "AI-native" rather than "AI-themed."

## User-facing behavior

When the PCP view loads, it calls the `/api/infer` endpoint with the patient ID. The endpoint reads the encounter note, sends it to the Anthropic API, and returns a structured inference result. The Pathfinder card renders this result.

While the call is in flight, the card shows a loading state: "Pathfinder is reading the chart..." with a small animated indicator. Total wait should be 2-4 seconds. The result is cached client-side so subsequent navigation back to the page does not re-trigger the call.

If the API key is missing, the API errors, or the call exceeds a 10-second timeout, the endpoint silently returns the hardcoded result from `lib/inference.ts`. The user sees no error.

## Files to create or modify

- `app/api/infer/route.ts` — the API route
- `lib/anthropic.ts` — thin wrapper around the Anthropic SDK
- `lib/prompts.ts` — the system prompt and user prompt template
- `app/pcp/page.tsx` — modify to call the endpoint instead of reading hardcoded inference
- `components/pathfinder-card.tsx` — modify to show loading state

## Implementation notes

### API route (`app/api/infer/route.ts`)

```ts
// POST /api/infer
// Request body: { patientId: string }
// Response: InferenceResult (from lib/types.ts)
```

Flow:
1. Parse `patientId` from request body
2. Look up the patient and encounter note from `lib/data/`
3. If `process.env.ANTHROPIC_API_KEY` is missing, return the hardcoded result from `lib/inference.ts`
4. Build the prompt using `lib/prompts.ts`
5. Call the Anthropic API with a 10-second timeout
6. Parse the response into the `InferenceResult` shape
7. On any error or timeout, log and return the hardcoded fallback
8. Return the result as JSON

### Prompt design (`lib/prompts.ts`)

The system prompt instructs the model to act as a clinical referral routing agent. It returns structured JSON only, no prose. Schema:

```json
{
  "subSpecialty": "Shoulder",
  "confidence": 0.92,
  "rationale": "Encounter note describes...",
  "evidencePhrases": ["positive Hawkins-Kennedy", "weakness with overhead motion", "..."]
}
```

The user prompt includes the encounter note and a list of valid sub-specialties to choose from. The list of valid sub-specialties comes from the orthopedic specialists in `lib/data/specialists.ts`. The model picks one.

Use Claude Sonnet, not Opus. Set `max_tokens` to ~500. Temperature 0 or 0.1 for deterministic-ish output.

### Specialist ranking

The LLM only returns the inferred sub-specialty plus rationale and evidence phrases. The actual ranking of specialists is computed in code in `app/api/infer/route.ts` after the LLM call: filter the specialist directory by the inferred sub-specialty, sort by `fitScore` descending, take the top 3. This keeps the LLM scope tight and the ranking deterministic.

### Client-side caching

Use `useState` in the PCP page to store the inference result. Once set, do not re-call. If the user navigates away and back, the result persists for the session.

### Error handling

All errors are silent to the user. Log to the server console. The hardcoded fallback always renders successfully.

## Acceptance criteria

- [ ] `/api/infer` endpoint exists and accepts POST with `{ patientId }`
- [ ] When `ANTHROPIC_API_KEY` is set, the endpoint calls the real API and returns a structured result
- [ ] When `ANTHROPIC_API_KEY` is missing, the endpoint returns the hardcoded fallback without error
- [ ] On API timeout or error, the endpoint silently returns the hardcoded fallback
- [ ] PCP view shows a loading state while the call is in flight
- [ ] Result is cached client-side and does not re-trigger on navigation
- [ ] No API key is logged or exposed to the client
- [ ] Specialist ranking is computed server-side after the LLM call, not by the LLM

## Out of scope for this feature

- Streaming responses
- User-facing error messages
- Retry logic beyond a single timeout
- Multi-turn conversation
- Letting the user edit the encounter note and re-run inference

## Dependencies

F01, F02, F04 (the PCP view must exist before this feature can swap its data source).

## Estimated time

2-3 hours.
