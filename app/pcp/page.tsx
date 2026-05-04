"use client";

import { getPatient } from "@/lib/data/patients";
import { getNote } from "@/lib/data/notes";
import { PatientBanner, EmrSidebar } from "@/components/emr-chrome";
import EncounterNoteDisplay from "@/components/encounter-note";
import { PathfinderProvider, PathfinderTrigger, PathfinderResults } from "@/components/pathfinder-section";
import Card from "@/components/ui/card";

const PATIENT_ID = "pat-001";

export default function PcpView() {
  const patient = getPatient(PATIENT_ID)!;
  const note = getNote(PATIENT_ID)!;

  return (
    <PathfinderProvider patientId={PATIENT_ID}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <PatientBanner patient={patient} />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <EmrSidebar />
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "var(--surface-sunken)",
              padding: 24,
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Top row: encounter note + sidebar controls */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                {/* Left: encounter note */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <EncounterNoteDisplay note={note} />
                </div>

                {/* Right: referral order + Pathfinder trigger */}
                <div style={{ width: 360, flexShrink: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
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

                    <PathfinderTrigger />
                  </div>
                </div>
              </div>

              {/* Full-width Pathfinder results (appears after inference) */}
              <PathfinderResults />
            </div>
          </div>
        </div>
      </div>
    </PathfinderProvider>
  );
}
