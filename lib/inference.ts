import { InferenceResult } from "./types";
import { specialists } from "./data/specialists";

const shoulderSpecialists = specialists
  .filter((s) => s.subSpecialty === "Orthopedic Surgery - Shoulder & Elbow")
  .sort((a, b) => b.fitScore - a.fitScore);

const cardiologySpecialists = specialists
  .filter(
    (s) =>
      s.subSpecialty === "Cardiology - General" ||
      s.subSpecialty === "Cardiology - Electrophysiology"
  )
  .sort((a, b) => b.fitScore - a.fitScore);

const giSpecialists = specialists
  .filter((s) => s.subSpecialty === "Gastroenterology")
  .sort((a, b) => b.fitScore - a.fitScore);

const mockInferenceResults: Record<string, InferenceResult> = {
  "pat-001": {
    subSpecialty: "Orthopedic Surgery - Shoulder & Elbow",
    confidence: 0.94,
    rationale:
      "Clinical exam findings including positive Hawkins-Kennedy test, supraspinatus weakness on empty can test, and painful arc are highly specific for rotator cuff pathology. Combined with the mechanism of repetitive overhead lifting and 6-week duration, this presentation strongly indicates a shoulder sub-specialist for likely surgical evaluation of a partial-thickness rotator cuff tear.",
    evidencePhrases: [
      "rotator cuff weakness noted on resisted external rotation",
      "Positive Hawkins-Kennedy test",
      "Empty can test positive for supraspinatus weakness",
      "positive painful arc between 60 and 120 degrees",
      "pain with overhead motion",
      "repetitive overhead lifting",
    ],
    rankedSpecialists: shoulderSpecialists,
  },
  "pat-002": {
    subSpecialty: "Cardiology - General",
    confidence: 0.88,
    rationale:
      "Irregularly irregular rhythm on exam with new-onset palpitations and exertional dyspnea is strongly suggestive of atrial fibrillation. General cardiology is the appropriate first referral for rhythm confirmation, anticoagulation risk stratification, and rate versus rhythm control decision-making. Electrophysiology may be appropriate downstream if ablation is considered.",
    evidencePhrases: [
      "irregularly irregular rhythm",
      "palpitations described as a fluttering sensation",
      "progressive exertional dyspnea",
      "family history of atrial fibrillation in mother",
    ],
    rankedSpecialists: cardiologySpecialists,
  },
  "pat-003": {
    subSpecialty: "Gastroenterology",
    confidence: 0.91,
    rationale:
      "Recurrent post-prandial epigastric pain with burning quality, partial antacid response, and 4-month duration warrant gastroenterology referral for evaluation of peptic ulcer disease versus functional dyspepsia. Upper endoscopy is indicated given symptom persistence, and H. pylori workup should be completed prior to the visit.",
    evidencePhrases: [
      "epigastric pain described as a burning, gnawing sensation",
      "pain typically begins 30-60 minutes after meals",
      "post-prandial bloating, early satiety",
      "partial relief with OTC antacids",
    ],
    rankedSpecialists: giSpecialists,
  },
};

export function getMockInference(patientId: string): InferenceResult | null {
  return mockInferenceResults[patientId] ?? null;
}
