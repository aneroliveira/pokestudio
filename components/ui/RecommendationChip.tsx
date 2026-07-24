import type { StatusDecisao } from "@/models/pokemon";
import { Tooltip } from "@/components/ui/Tooltip";

type RecommendationChipProps = {
  status: StatusDecisao;
  label: string;
  motivo?: string;
};

const styles = {
  sim: {
    icon: "🟢",
    className: "bg-good text-good-foreground",
  },
  atencao: {
    icon: "🟡",
    className: "bg-attention text-attention-foreground",
  },
  nao: {
    icon: "🔴",
    className: "bg-bad text-bad-foreground",
  },
};

export function RecommendationChip({
  status,
  label,
  motivo,
}: RecommendationChipProps) {
  const style = styles[status];

  const chip = (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${style.className}`}
    >
      <span>{style.icon}</span>

      <span>{label}</span>
    </span>
  );

  return motivo ? <Tooltip content={motivo}>{chip}</Tooltip> : chip;
}
