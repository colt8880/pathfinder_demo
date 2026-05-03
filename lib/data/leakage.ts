import { ReferralEvent } from "../types";

// 60 referrals over 30 days: ~42 captured, ~18 leaked (~30% leakage rate)
// Key pattern: 23 shoulder referrals, 18 leaked to Mid-South Shoulder Group (out-of-network)
export const referralEvents: ReferralEvent[] = [
  // --- Day 1-5 ---
  { id: "ref-001", date: "2025-03-20", patientIdRedacted: "P-0431", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6200, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-002", date: "2025-03-20", patientIdRedacted: "P-0512", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3400, outcome: "captured" },
  { id: "ref-003", date: "2025-03-21", patientIdRedacted: "P-0287", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 4100, outcome: "captured" },
  { id: "ref-004", date: "2025-03-21", patientIdRedacted: "P-0619", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5800, outcome: "captured" },
  { id: "ref-005", date: "2025-03-22", patientIdRedacted: "P-0733", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2800, outcome: "captured" },
  { id: "ref-006", date: "2025-03-22", patientIdRedacted: "P-0154", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 7100, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-007", date: "2025-03-23", patientIdRedacted: "P-0892", specialty: "Cardiology", subSpecialty: "Electrophysiology", estimatedDownstreamValue: 5200, outcome: "captured" },
  { id: "ref-008", date: "2025-03-23", patientIdRedacted: "P-0341", specialty: "Orthopedic Surgery", subSpecialty: "Hip & Knee", estimatedDownstreamValue: 4500, outcome: "captured" },
  { id: "ref-009", date: "2025-03-24", patientIdRedacted: "P-0468", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5500, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-010", date: "2025-03-24", patientIdRedacted: "P-0975", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3200, outcome: "captured" },

  // --- Day 6-10 ---
  { id: "ref-011", date: "2025-03-25", patientIdRedacted: "P-0126", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6800, outcome: "captured" },
  { id: "ref-012", date: "2025-03-25", patientIdRedacted: "P-0543", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3800, outcome: "captured" },
  { id: "ref-013", date: "2025-03-26", patientIdRedacted: "P-0687", specialty: "Orthopedic Surgery", subSpecialty: "Spine", estimatedDownstreamValue: 7500, outcome: "captured" },
  { id: "ref-014", date: "2025-03-26", patientIdRedacted: "P-0214", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 4900, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-015", date: "2025-03-27", patientIdRedacted: "P-0398", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3600, outcome: "captured" },
  { id: "ref-016", date: "2025-03-27", patientIdRedacted: "P-0851", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2400, outcome: "captured" },
  { id: "ref-017", date: "2025-03-28", patientIdRedacted: "P-0762", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5300, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-018", date: "2025-03-28", patientIdRedacted: "P-0193", specialty: "Cardiology", subSpecialty: "Interventional", estimatedDownstreamValue: 8000, outcome: "captured" },
  { id: "ref-019", date: "2025-03-29", patientIdRedacted: "P-0425", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6100, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-020", date: "2025-03-29", patientIdRedacted: "P-0636", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 4300, outcome: "captured" },

  // --- Day 11-15 ---
  { id: "ref-021", date: "2025-03-30", patientIdRedacted: "P-0578", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5700, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-022", date: "2025-03-30", patientIdRedacted: "P-0319", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3100, outcome: "captured" },
  { id: "ref-023", date: "2025-03-31", patientIdRedacted: "P-0847", specialty: "Orthopedic Surgery", subSpecialty: "Hand & Wrist", estimatedDownstreamValue: 3400, outcome: "captured" },
  { id: "ref-024", date: "2025-03-31", patientIdRedacted: "P-0162", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6500, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-025", date: "2025-04-01", patientIdRedacted: "P-0493", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2600, outcome: "captured" },
  { id: "ref-026", date: "2025-04-01", patientIdRedacted: "P-0715", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5100, outcome: "captured" },
  { id: "ref-027", date: "2025-04-02", patientIdRedacted: "P-0258", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3900, outcome: "captured" },
  { id: "ref-028", date: "2025-04-02", patientIdRedacted: "P-0684", specialty: "Cardiology", subSpecialty: "Electrophysiology", estimatedDownstreamValue: 4800, outcome: "captured" },
  { id: "ref-029", date: "2025-04-03", patientIdRedacted: "P-0371", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 7300, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-030", date: "2025-04-03", patientIdRedacted: "P-0946", specialty: "Orthopedic Surgery", subSpecialty: "Hip & Knee", estimatedDownstreamValue: 5600, outcome: "captured" },

  // --- Day 16-20 ---
  { id: "ref-031", date: "2025-04-04", patientIdRedacted: "P-0537", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 4700, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-032", date: "2025-04-04", patientIdRedacted: "P-0812", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3300, outcome: "captured" },
  { id: "ref-033", date: "2025-04-05", patientIdRedacted: "P-0149", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 4200, outcome: "captured" },
  { id: "ref-034", date: "2025-04-05", patientIdRedacted: "P-0673", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5900, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-035", date: "2025-04-06", patientIdRedacted: "P-0295", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2200, outcome: "captured" },
  { id: "ref-036", date: "2025-04-06", patientIdRedacted: "P-0418", specialty: "Orthopedic Surgery", subSpecialty: "Spine", estimatedDownstreamValue: 7800, outcome: "captured" },
  { id: "ref-037", date: "2025-04-07", patientIdRedacted: "P-0563", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6400, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-038", date: "2025-04-07", patientIdRedacted: "P-0827", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3700, outcome: "captured" },
  { id: "ref-039", date: "2025-04-08", patientIdRedacted: "P-0196", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3500, outcome: "captured" },
  { id: "ref-040", date: "2025-04-08", patientIdRedacted: "P-0741", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5400, outcome: "captured" },

  // --- Day 21-25 ---
  { id: "ref-041", date: "2025-04-09", patientIdRedacted: "P-0384", specialty: "Cardiology", subSpecialty: "Electrophysiology", estimatedDownstreamValue: 5100, outcome: "captured" },
  { id: "ref-042", date: "2025-04-09", patientIdRedacted: "P-0652", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6700, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-043", date: "2025-04-10", patientIdRedacted: "P-0917", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 4000, outcome: "captured" },
  { id: "ref-044", date: "2025-04-10", patientIdRedacted: "P-0238", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2900, outcome: "captured" },
  { id: "ref-045", date: "2025-04-11", patientIdRedacted: "P-0476", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5000, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-046", date: "2025-04-11", patientIdRedacted: "P-0593", specialty: "Orthopedic Surgery", subSpecialty: "Hip & Knee", estimatedDownstreamValue: 4400, outcome: "captured" },
  { id: "ref-047", date: "2025-04-12", patientIdRedacted: "P-0865", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3600, outcome: "captured" },
  { id: "ref-048", date: "2025-04-12", patientIdRedacted: "P-0127", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6000, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-049", date: "2025-04-13", patientIdRedacted: "P-0349", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3800, outcome: "captured" },
  { id: "ref-050", date: "2025-04-13", patientIdRedacted: "P-0718", specialty: "Orthopedic Surgery", subSpecialty: "Hand & Wrist", estimatedDownstreamValue: 2800, outcome: "captured" },

  // --- Day 26-30 ---
  { id: "ref-051", date: "2025-04-14", patientIdRedacted: "P-0581", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5600, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-052", date: "2025-04-14", patientIdRedacted: "P-0463", specialty: "Cardiology", subSpecialty: "Interventional", estimatedDownstreamValue: 7200, outcome: "captured" },
  { id: "ref-053", date: "2025-04-15", patientIdRedacted: "P-0295", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 3100, outcome: "captured" },
  { id: "ref-054", date: "2025-04-15", patientIdRedacted: "P-0839", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 6900, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-055", date: "2025-04-16", patientIdRedacted: "P-0174", specialty: "Neurology", subSpecialty: "General Neurology", estimatedDownstreamValue: 2500, outcome: "captured" },
  { id: "ref-056", date: "2025-04-16", patientIdRedacted: "P-0628", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3900, outcome: "captured" },
  { id: "ref-057", date: "2025-04-17", patientIdRedacted: "P-0752", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 5200, outcome: "captured" },
  { id: "ref-058", date: "2025-04-17", patientIdRedacted: "P-0316", specialty: "Gastroenterology", subSpecialty: "General GI", estimatedDownstreamValue: 4500, outcome: "captured" },
  { id: "ref-059", date: "2025-04-18", patientIdRedacted: "P-0489", specialty: "Orthopedic Surgery", subSpecialty: "Shoulder & Elbow", estimatedDownstreamValue: 7500, outcome: "leaked", leakedTo: "Mid-South Shoulder Group" },
  { id: "ref-060", date: "2025-04-18", patientIdRedacted: "P-0941", specialty: "Cardiology", subSpecialty: "General", estimatedDownstreamValue: 3200, outcome: "captured" },
];
