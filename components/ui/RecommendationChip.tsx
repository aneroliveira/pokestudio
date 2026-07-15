import type { StatusDecisao } from "@/models/pokemon";

type RecommendationChipProps = {
  status: StatusDecisao;
  label: string;
};

const styles = {
  sim: {
    icon: "🟢",
    className:
      "border-green-200 bg-green-50 text-green-800",
  },
  atencao: {
    icon: "🟡",
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
  nao: {
    icon: "🔴",
    className:
      "border-red-200 bg-red-50 text-red-800",
  },
};

export function RecommendationChip({
  status,
  label,
}: RecommendationChipProps) {
  const style = styles[status];

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${style.className}`}
    >
      <span>{style.icon}</span>

      <span>{label}</span>
    </div>
  );
}