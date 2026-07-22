type TabsProps<T extends string> = {
  abas: readonly T[];
  ativa: T;
  onChange: (aba: T) => void;
};

export function Tabs<T extends string>({
  abas,
  ativa,
  onChange,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className="flex flex-wrap gap-1 border-b border-zinc-200"
    >
      {abas.map((aba) => {
        const selecionada = aba === ativa;

        return (
          <button
            key={aba}
            type="button"
            role="tab"
            aria-selected={selecionada}
            onClick={() => onChange(aba)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition ${
              selecionada
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {aba}
          </button>
        );
      })}
    </div>
  );
}
