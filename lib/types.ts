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
  authorTitle: string;
  body: string;
  evidencePhrases: { phrase: string; signal: string }[];
};

export type Specialist = {
  id: string;
  name: string;
  subSpecialty: string;
  practiceName: string;
  distanceMiles: number;
  inNetworkPayers: string[];
  nextAvailableDays: number;
  fitScore: number;
};

export type ReferralEvent = {
  id: string;
  date: string;
  patientIdRedacted: string;
  specialty: string;
  subSpecialty: string;
  estimatedDownstreamValue: number;
  outcome: "captured" | "leaked";
  leakedTo?: string;
};

export type InferenceResult = {
  subSpecialty: string;
  confidence: number;
  rationale: string;
  evidencePhrases: string[];
  rankedSpecialists: Specialist[];
};
