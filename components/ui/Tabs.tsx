type TabsProps<T extends string> = {
  abas: readonly T[];
  ativa: T;
  onChange: (aba: T) => void;
  marcadas?: Partial<Record<T, boolean>>;
};

export function Tabs<T extends string>({
  abas,
  ativa,
  onChange,
  marcadas,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className="flex flex-wrap gap-1 border-b border-border"
    >
      {abas.map((aba) => {
        const selecionada = aba === ativa;
        const marcada = marcadas?.[aba];

        return (
          <button
            key={aba}
            type="button"
            role="tab"
            aria-selected={selecionada}
            onClick={() => onChange(aba)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 px-4 py-2 text-sm font-medium transition ${
              selecionada
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {aba}
            {marcada && (
              <span
                aria-label="preenchida"
                className="h-1.5 w-1.5 rounded-full bg-success"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
