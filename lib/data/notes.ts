import { EncounterNote } from "../types";

export const encounterNotes: EncounterNote[] = [
  {
    patientId: "pat-001",
    date: "2025-04-18",
    authorTitle: "PCP, Internal Medicine",
    body: `CC: Right shoulder pain x 6 weeks, worsening.

HPI: 52 y/o male construction worker presents with progressive right shoulder pain that began after a day of repetitive overhead lifting at a job site. Pain is localized to the anterolateral shoulder, rated 6/10 at rest and 8/10 with overhead motion. Reports difficulty reaching above shoulder height and nighttime pain when sleeping on the affected side. Denies trauma, locking, or instability. Has tried ibuprofen 600mg TID with minimal relief. No prior shoulder injuries or surgeries.

Exam: Right shoulder with tenderness over the greater tuberosity. Active ROM limited in forward flexion (140 degrees) and abduction (130 degrees) due to pain. Rotator cuff weakness noted on resisted external rotation (4/5 strength). Positive Hawkins-Kennedy test. Positive painful arc between 60 and 120 degrees of abduction. Empty can test positive for supraspinatus weakness. Contralateral shoulder exam normal.

Assessment: Clinical presentation consistent with rotator cuff pathology, likely partial-thickness tear given mechanism, duration, and exam findings. Rotator cuff weakness and positive impingement signs warrant further workup.

Plan: Order MRI right shoulder without contrast. Refer to orthopedic surgery, shoulder sub-specialty preferred given suspected rotator cuff tear. Continue NSAIDs, add ice and activity modification. Patient advised to avoid overhead lifting pending evaluation.`,
    evidencePhrases: [
      {
        phrase: "rotator cuff weakness noted on resisted external rotation",
        signal: "Exam finding specific to rotator cuff pathology",
      },
      {
        phrase: "Positive Hawkins-Kennedy test",
        signal: "Impingement sign associated with rotator cuff injury",
      },
      {
        phrase: "pain with overhead motion",
        signal: "Functional limitation consistent with shoulder pathology",
      },
      {
        phrase: "Empty can test positive for supraspinatus weakness",
        signal: "Specific test for supraspinatus tendon integrity",
      },
      {
        phrase: "positive painful arc between 60 and 120 degrees",
        signal: "Classic arc of impingement suggesting subacromial pathology",
      },
      {
        phrase: "repetitive overhead lifting",
        signal: "Mechanism of injury consistent with rotator cuff tear",
      },
    ],
  },
  {
    patientId: "pat-002",
    date: "2025-04-20",
    authorTitle: "PCP, Internal Medicine",
    body: `CC: Palpitations and shortness of breath on exertion x 3 weeks.

HPI: 64 y/o retired female presents with intermittent palpitations described as a fluttering sensation in the chest, occurring 2-3 times per week and lasting minutes at a time. Episodes are not reliably provoked by exertion but are more noticeable at rest. Concurrently reports progressive exertional dyspnea when climbing stairs or walking more than two blocks, new over the past month. Denies chest pain, syncope, or presyncope. No prior cardiac history. Takes lisinopril 10mg daily for hypertension. Non-smoker. Family history of atrial fibrillation in mother.

Exam: BP 138/82, HR 88 irregular, SpO2 97% on RA. Cardiac auscultation reveals irregularly irregular rhythm without murmurs, gallops, or rubs. Lungs clear bilaterally. No peripheral edema. JVP not elevated.

Assessment: New-onset irregularly irregular rhythm with palpitations and exertional dyspnea, concerning for atrial fibrillation. Family history and age are additional risk factors. CHA2DS2-VASc score pending full workup.

Plan: Order 12-lead ECG and 48-hour Holter monitor. Basic labs including TSH, CBC, BMP. Refer to cardiology for rhythm evaluation and anticoagulation assessment. Hold on rate control pending confirmed diagnosis.`,
    evidencePhrases: [
      {
        phrase: "irregularly irregular rhythm",
        signal: "Hallmark physical finding of atrial fibrillation",
      },
      {
        phrase: "palpitations described as a fluttering sensation",
        signal: "Symptom consistent with arrhythmia",
      },
      {
        phrase: "progressive exertional dyspnea",
        signal: "Suggests hemodynamic consequence of rhythm disturbance",
      },
      {
        phrase: "family history of atrial fibrillation in mother",
        signal: "Genetic risk factor for atrial fibrillation",
      },
    ],
  },
  {
    patientId: "pat-003",
    date: "2025-04-22",
    authorTitle: "PCP, Family Medicine",
    body: `CC: Recurring upper abdominal pain x 4 months.

HPI: 38 y/o male software engineer presents with episodic epigastric pain described as a burning, gnawing sensation occurring 3-4 times per week. Pain typically begins 30-60 minutes after meals and lasts 1-2 hours. Associated with post-prandial bloating, early satiety, and occasional nausea. Denies vomiting, hematemesis, melena, weight loss, or dysphagia. Reports increased work stress over the past 6 months. Diet high in processed foods and coffee (4-5 cups daily). Tried OTC antacids with partial relief. No prior GI workup. No NSAID use. No family history of GI malignancy.

Exam: Abdomen soft, non-distended. Mild tenderness to deep palpation in the epigastrium. No rebound, guarding, or organomegaly. Bowel sounds normal. No Murphy sign.

Assessment: Recurrent dyspepsia with features suggestive of peptic ulcer disease versus functional dyspepsia. Duration and frequency warrant further evaluation. H. pylori status unknown.

Plan: Order H. pylori stool antigen. Start empiric PPI therapy (omeprazole 20mg daily x 4 weeks). Refer to gastroenterology for evaluation and consideration of upper endoscopy given symptom persistence. Counsel on dietary modification and stress management.`,
    evidencePhrases: [
      {
        phrase: "epigastric pain described as a burning, gnawing sensation",
        signal: "Classic description of peptic-type dyspepsia",
      },
      {
        phrase: "pain typically begins 30-60 minutes after meals",
        signal: "Temporal pattern suggesting gastric pathology",
      },
      {
        phrase: "post-prandial bloating, early satiety",
        signal: "Upper GI motility or mucosal symptoms",
      },
      {
        phrase: "partial relief with OTC antacids",
        signal: "Acid-mediated component to symptoms",
      },
    ],
  },
];

export function getNote(patientId: string): EncounterNote | undefined {
  return encounterNotes.find((n) => n.patientId === patientId);
}
