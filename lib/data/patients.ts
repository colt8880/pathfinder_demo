import { Patient } from "../types";

export const patients: Patient[] = [
  {
    id: "pat-001",
    name: "Tom Bauer",
    age: 52,
    occupation: "Construction worker",
    insurance: "Employer PPO (BlueCross Preferred)",
    pcpRelationshipYears: 4,
    chiefComplaint: "Right shoulder pain worsening over 6 weeks",
  },
  {
    id: "pat-002",
    name: "Janet Reyes",
    age: 64,
    occupation: "Retired teacher",
    insurance: "Medicare Advantage (Aetna MA-PPO)",
    pcpRelationshipYears: 7,
    chiefComplaint: "Intermittent palpitations and exertional dyspnea",
  },
  {
    id: "pat-003",
    name: "Marcus Hill",
    age: 38,
    occupation: "Software engineer",
    insurance: "Employer HMO (UnitedHealth Select)",
    pcpRelationshipYears: 2,
    chiefComplaint: "Recurring epigastric pain with post-prandial bloating",
  },
];

export function getPatient(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}
