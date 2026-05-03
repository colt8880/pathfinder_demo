import { getPatient } from "@/lib/data/patients";
import { getNote } from "@/lib/data/notes";
import { PatientBanner, EmrSidebar } from "@/components/emr-chrome";
import EncounterNoteDisplay from "@/components/encounter-note";
import PathfinderSection from "@/components/pathfinder-section";
import Card from "@/components/ui/card";

const PATIENT_ID = "pat-001";

export default function PcpView() {
  const patient = getPatient(PATIENT_ID)!;
  const note = getNote(PATIENT_ID)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <PatientBanner patient={patient} />
      <div style={{ display: "flex", flex: 1 }}>
        <EmrSidebar />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--surface-sunken)",
            padding: "24px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: 16,
              alignItems: "start",
            }}
          >
            {/* Left column: encounter note */}
            <EncounterNoteDisplay note={note} />

            {/* Right column: referral order + Pathfinder, top-aligned with note */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "sticky",
                top: 24,
              }}
            >
              <Card title="Referral order" padding={16}>
                <input
                  type="text"
                  readOnly
                  value="Orthopedic Surgery"
                  style={{
                    width: "100%",
                    height: "var(--row-height-control)",
                    padding: "0 12px",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-control)",
                    background: "var(--surface-sunken)",
                    font: "400 14px/20px var(--font-sans)",
                    color: "var(--ink-primary)",
                  }}
                />
              </Card>

              <PathfinderSection patientId={PATIENT_ID} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
