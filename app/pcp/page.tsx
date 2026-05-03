import { getPatient } from "@/lib/data/patients";
import { getNote } from "@/lib/data/notes";
import { PatientBanner, EmrSidebar } from "@/components/emr-chrome";
import EncounterNoteDisplay from "@/components/encounter-note";
import PathfinderSection from "@/components/pathfinder-section";

const PATIENT_ID = "pat-001";

export default function PcpView() {
  const patient = getPatient(PATIENT_ID)!;
  const note = getNote(PATIENT_ID)!;

  return (
    <div className="flex flex-1 flex-col">
      <PatientBanner patient={patient} />
      <div className="flex flex-1">
        <EmrSidebar />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-5">
            <EncounterNoteDisplay note={note} />

            {/* Order entry field */}
            <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
              <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                Referral Order
              </label>
              <input
                type="text"
                readOnly
                value="Orthopedic Surgery"
                className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* Pathfinder card (fetches inference via API) */}
            <PathfinderSection patientId={PATIENT_ID} />
          </div>
        </div>
      </div>
    </div>
  );
}
