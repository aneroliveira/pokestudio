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
      // Uma linha só: se não couber (celular com 4 abas), rola pro lado em
      // vez de quebrar — quebrar deixava uma aba sozinha na linha de baixo.
      className="flex gap-0 overflow-x-auto border-b border-border [scrollbar-width:none] sm:gap-1"
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
            className={`-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition sm:px-4 ${
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
