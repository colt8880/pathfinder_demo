export default function MetricTile({
  label,
  value,
  subtext,
  subtextColor,
}: {
  label: string;
  value: string;
  subtext: string;
  subtextColor?: "red" | "default";
}) {
  return (
    <div className="flex-1 rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
      <p
        className={`mt-1 text-xs ${
          subtextColor === "red"
            ? "text-red-600 dark:text-red-400"
            : "text-zinc-500"
        }`}
      >
        {subtext}
      </p>
    </div>
  );
}
