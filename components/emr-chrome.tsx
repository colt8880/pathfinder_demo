import { Patient } from "@/lib/types";

const sidebarItems = [
  { label: "Chart", active: false },
  { label: "Orders", active: true },
  { label: "Notes", active: false },
  { label: "Results", active: false },
  { label: "Messaging", active: false },
];

export function PatientBanner({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center gap-6 bg-slate-700 px-5 py-3 text-sm text-white">
      <span className="font-semibold text-base">{patient.name}</span>
      <span className="text-slate-300">
        {patient.age} y/o | MRN: 00{patient.id.replace("pat-", "")} |{" "}
        {patient.insurance}
      </span>
      <span className="ml-auto text-slate-400">
        PCP relationship: {patient.pcpRelationshipYears} years
      </span>
    </div>
  );
}

export function EmrSidebar() {
  return (
    <aside className="w-48 shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <nav className="flex flex-col py-2">
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className={`px-4 py-2.5 text-sm cursor-default ${
              item.active
                ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600 dark:bg-blue-950 dark:text-blue-300"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
