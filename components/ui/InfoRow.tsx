type InfoRowProps = {
  label: string;
  value: string | number;
  /** Contexto secundário, em cinza, ao lado do rótulo (ex.: "Nível 20"). */
  hint?: string;
};

export function InfoRow({
  label,
  value,
  hint,
}: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      {/* Em tela estreita o contexto vai para a linha de baixo, evitando
          quebra no meio da frase. */}
      <span className="flex min-w-0 flex-col text-muted-foreground sm:flex-row sm:items-baseline sm:gap-2">
        <span>{label}</span>
        {hint && (
          <span className="text-xs text-muted-foreground/70">
            {hint}
          </span>
        )}
      </span>

      <strong className="shrink-0 text-lg font-bold text-foreground">
        {value}
      </strong>
    </div>
  );
}
