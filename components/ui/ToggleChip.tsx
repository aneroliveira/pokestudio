type ToggleChipProps = {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
  /** Nome do chip quando o texto pode sumir (ex.: só ícone no celular) —
   *  vira dica ao passar o mouse e nome pro leitor de tela. */
  rotulo?: string;
};

/** Chip clicável (Shiny, Mega, filtros de IV...) — ativo destaca com a cor primária. */
export function ToggleChip({ ativo, onClick, children, rotulo }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      aria-label={rotulo}
      title={rotulo}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
        ativo
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
