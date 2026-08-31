type ToggleChipProps = {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

/** Chip clicável (Shiny, Mega, filtros de IV...) — ativo destaca com a cor primária. */
export function ToggleChip({ ativo, onClick, children }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        ativo
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
