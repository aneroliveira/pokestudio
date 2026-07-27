import type { StatusDecisao } from "@/models/pokemon";

type RecommendationChipProps = {
  status: StatusDecisao;
  label: string;
  /** Quando há motivo, o chip vira botão e o pai controla a expansão. */
  onClick?: () => void;
  selecionado?: boolean;
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
  onClick,
  selecionado = false,
}: RecommendationChipProps) {
  const style = styles[status];
  const base = `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${style.className}`;

  const conteudo = (
    <>
      <span>{style.icon}</span>
      <span>{label}</span>
    </>
  );

  // Sem motivo: chip informativo, não interativo.
  if (!onClick) {
    return <span className={base}>{conteudo}</span>;
  }

  // Com motivo: botão que expande o texto no pai. O anel indica qual está
  // aberto; o cursor e o aria-expanded deixam claro que é tocável.
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={selecionado}
      className={`${base} cursor-pointer transition ${
        selecionado
          ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
          : "hover:brightness-110"
      }`}
    >
      {conteudo}
    </button>
  );
}
