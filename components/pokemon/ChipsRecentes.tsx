import type { ItemIndicePokemon } from "@/models/indice";

type ChipsRecentesProps = {
  itens: ItemIndicePokemon[];
  onSelect: (item: ItemIndicePokemon) => void;
};

/** Chips dos últimos Pokémon vistos, logo abaixo da busca — clicar já
 *  seleciona de novo, sem precisar digitar. Some quando não há nenhum
 *  ainda (primeira visita, ou storage limpo). */
export function ChipsRecentes({ itens, onSelect }: ChipsRecentesProps) {
  if (itens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {itens.map((item) => (
        <button
          key={item.numero}
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium capitalize text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
        >
          {item.nomeEn}
        </button>
      ))}
    </div>
  );
}
