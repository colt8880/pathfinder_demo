import { Specialist } from "../types";

export const specialists: Specialist[] = [
  // --- Orthopedic Surgery: Shoulder (3) ---
  {
    id: "sp-001",
    name: "Dr. Anika Patel",
    subSpecialty: "Orthopedic Surgery - Shoulder & Elbow",
    practiceName: "Summit Orthopedic Associates",
    distanceMiles: 4.2,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 6,
    fitScore: 94,
  },
  {
    id: "sp-002",
    name: "Dr. Marcus Chen",
    subSpecialty: "Orthopedic Surgery - Shoulder & Elbow",
    practiceName: "Lakeview Sports Medicine Center",
    distanceMiles: 8.1,
    inNetworkPayers: ["BlueCross Preferred", "Aetna MA-PPO"],
    nextAvailableDays: 3,
    fitScore: 91,
  },
  {
    id: "sp-003",
    name: "Dr. Rachel Okonkwo",
    subSpecialty: "Orthopedic Surgery - Shoulder & Elbow",
    practiceName: "Prestige Orthopedic Group",
    distanceMiles: 12.5,
    inNetworkPayers: ["BlueCross Preferred", "UnitedHealth Select"],
    nextAvailableDays: 11,
    fitScore: 87,
  },
  // --- Orthopedic Surgery: Hip (1) ---
  {
    id: "sp-004",
    name: "Dr. James Whitfield",
    subSpecialty: "Orthopedic Surgery - Hip & Knee",
    practiceName: "Summit Orthopedic Associates",
    distanceMiles: 4.2,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 8,
    fitScore: 32,
  },
  // --- Orthopedic Surgery: Spine (1) ---
  {
    id: "sp-005",
    name: "Dr. Laura Sinclair",
    subSpecialty: "Orthopedic Surgery - Spine",
    practiceName: "Meridian Spine & Joint",
    distanceMiles: 6.7,
    inNetworkPayers: ["BlueCross Preferred", "Aetna MA-PPO"],
    nextAvailableDays: 14,
    fitScore: 18,
  },
  // --- Orthopedic Surgery: Hand (1) ---
  {
    id: "sp-006",
    name: "Dr. Kevin Tran",
    subSpecialty: "Orthopedic Surgery - Hand & Wrist",
    practiceName: "Lakeview Sports Medicine Center",
    distanceMiles: 8.1,
    inNetworkPayers: ["BlueCross Preferred", "UnitedHealth Select"],
    nextAvailableDays: 5,
    fitScore: 22,
  },
  // --- Cardiology: General (2) ---
  {
    id: "sp-007",
    name: "Dr. Priya Kapoor",
    subSpecialty: "Cardiology - General",
    practiceName: "Heartland Cardiovascular Clinic",
    distanceMiles: 3.8,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 5,
    fitScore: 90,
  },
  {
    id: "sp-008",
    name: "Dr. Samuel Braxton",
    subSpecialty: "Cardiology - General",
    practiceName: "River City Heart Center",
    distanceMiles: 9.3,
    inNetworkPayers: ["Aetna MA-PPO"],
    nextAvailableDays: 7,
    fitScore: 84,
  },
  // --- Cardiology: Electrophysiology (1) ---
  {
    id: "sp-009",
    name: "Dr. Elena Vasquez",
    subSpecialty: "Cardiology - Electrophysiology",
    practiceName: "Heartland Cardiovascular Clinic",
    distanceMiles: 3.8,
    inNetworkPayers: ["BlueCross Preferred", "Aetna MA-PPO"],
    nextAvailableDays: 10,
    fitScore: 88,
  },
  // --- Cardiology: Interventional (1) ---
  {
    id: "sp-010",
    name: "Dr. David Nakamura",
    subSpecialty: "Cardiology - Interventional",
    practiceName: "River City Heart Center",
    distanceMiles: 9.3,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 12,
    fitScore: 45,
  },
  // --- Gastroenterology (3) ---
  {
    id: "sp-011",
    name: "Dr. Fatima Al-Rashid",
    subSpecialty: "Gastroenterology",
    practiceName: "Digestive Health Partners",
    distanceMiles: 5.1,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 4,
    fitScore: 92,
  },
  {
    id: "sp-012",
    name: "Dr. Brian Caldwell",
    subSpecialty: "Gastroenterology",
    practiceName: "Pinnacle GI Associates",
    distanceMiles: 7.4,
    inNetworkPayers: ["BlueCross Preferred", "UnitedHealth Select"],
    nextAvailableDays: 9,
    fitScore: 85,
  },
  {
    id: "sp-013",
    name: "Dr. Mei-Lin Wu",
    subSpecialty: "Gastroenterology",
    practiceName: "University GI Specialists",
    distanceMiles: 11.2,
    inNetworkPayers: ["BlueCross Preferred", "Aetna MA-PPO"],
    nextAvailableDays: 15,
    fitScore: 79,
  },
  // --- Neurology (2) ---
  {
    id: "sp-014",
    name: "Dr. Omar Hassan",
    subSpecialty: "Neurology",
    practiceName: "Brainbridge Neuroscience Group",
    distanceMiles: 6.0,
    inNetworkPayers: [
      "BlueCross Preferred",
      "Aetna MA-PPO",
      "UnitedHealth Select",
    ],
    nextAvailableDays: 8,
    fitScore: 15,
  },
  {
    id: "sp-015",
    name: "Dr. Catherine Lowe",
    subSpecialty: "Neurology",
    practiceName: "Brainbridge Neuroscience Group",
    distanceMiles: 6.0,
    inNetworkPayers: ["BlueCross Preferred"],
    nextAvailableDays: 18,
    fitScore: 12,
  },
];

export function getSpecialistsBySubSpecialty(
  subSpecialty: string
): Specialist[] {
  return specialists
    .filter((s) => s.subSpecialty === subSpecialty)
    .sort((a, b) => b.fitScore - a.fitScore);
}
