type Priority =
  | "S+"
  | "S"
  | "A+"
  | "A"
  | "B"
  | "C";

type Props = {
  value?: Priority;
};

const colors = {
  "S+": "bg-emerald-500",
  S: "bg-lime-500",
  "A+": "bg-sky-500",
  A: "bg-indigo-500",
  B: "bg-amber-500",
  C: "bg-zinc-400",
};

export function PriorityBadge({
  value,
}: Props) {
  if (!value) {
    return (
      <span className="rounded-full bg-zinc-300 px-3 py-1 text-sm font-semibold text-zinc-600">
        Sem Tier
      </span>
    );
  }

  return (
    <span
      className={`${colors[value]} rounded-full px-3 py-1 text-sm font-semibold text-white`}
    >
      {value}
    </span>
  );
}