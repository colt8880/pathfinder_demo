import Link from "next/link";
import { getNote } from "@/lib/data/notes";
import { getMockInference } from "@/lib/inference";
import EncounterNoteDisplay from "@/components/encounter-note";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import ConfidenceMeter from "@/components/ui/confidence-meter";

const PATIENT_ID = "pat-001";

const rejectedSubSpecialties = [
  { name: "Hip & Knee", reason: "No findings related to lower extremity joints. Pain is localized to the shoulder." },
  { name: "Spine", reason: "No radicular symptoms, no neck or back pain, no neurological deficits." },
  { name: "Hand & Wrist", reason: "No distal upper extremity findings. Pain and weakness are proximal." },
];

export default function ReasoningView() {
  const note = getNote(PATIENT_ID)!;
  const inference = getMockInference(PATIENT_ID)!;

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        background: "var(--surface-sunken)",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ font: "600 20px/28px var(--font-sans)", color: "var(--ink-primary)", margin: 0, letterSpacing: "-0.005em" }}>
            Clinical reasoning
          </h1>
          <p style={{ font: "400 14px/20px var(--font-sans)", color: "var(--ink-muted)", margin: "4px 0 0" }}>
            How Pathfinder inferred shoulder sub-specialty for Tom Bauer.
          </p>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          {/* Encounter note with highlights */}
          <div style={{ flex: 1 }}>
            <EncounterNoteDisplay note={note} highlight={true} />
          </div>

          {/* Right panel */}
          <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Inference summary */}
            <Card padding={16}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="op-eyebrow">Inferred sub-specialty</span>
                  <Badge tone="signal" mono={false}>Pathfinder</Badge>
                </div>
                <span style={{ font: "600 17px/22px var(--font-sans)", color: "var(--ink-primary)" }}>
                  {inference.subSpecialty.replace(" - ", " — ")}
                </span>
                <ConfidenceMeter value={inference.confidence} />
                <div style={{ borderTop: "1px solid var(--border-divider)", paddingTop: 12 }}>
                  <span className="op-eyebrow" style={{ marginBottom: 8, display: "block" }}>Codes</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge tone="neutral">ICD-10 M75.121</Badge>
                    <Badge tone="neutral">CPT 23410</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Evidence list */}
            <Card title="Evidence phrases" padding={16}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {inference.evidencePhrases.map((phrase, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        background: "var(--signal-primary)",
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="op-num"
                      style={{
                        font: "400 13px/18px var(--font-mono)",
                        color: "var(--ink-primary)",
                      }}
                    >
                      {phrase}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Why not others */}
            <Card title="Why not other sub-specialties" padding={16}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {rejectedSubSpecialties.map((sub) => (
                  <div key={sub.name}>
                    <span style={{ font: "500 13px/18px var(--font-sans)", color: "var(--ink-primary)" }}>
                      {sub.name}
                    </span>
                    <p style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)", margin: "2px 0 0" }}>
                      {sub.reason}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Back link */}
            <Link
              href="/pcp"
              style={{
                font: "500 13px/18px var(--font-sans)",
                color: "var(--signal-primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Send to PCP view
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
