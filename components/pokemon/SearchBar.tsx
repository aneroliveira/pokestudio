import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { ItemIndicePokemon } from "@/models/indice";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (item: ItemIndicePokemon) => void;
  placeholder?: string;
  resultados: ItemIndicePokemon[];
};

function formatarNome(nomeEn: string) {
  return nomeEn
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

export function SearchBar({
  value,
  onChange,
  onSelect,
  placeholder = "Pesquise um Pokémon...",
  resultados,
}: SearchBarProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        />

        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>

      <p className="text-sm text-zinc-500">
        Digite o nome (em inglês) ou o número da Pokédex.
      </p>
      {value && resultados.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border bg-white shadow-sm">
          {resultados.map((item) => (
            <div
              key={item.numero}
              onClick={() => onSelect(item)}
              className="cursor-pointer border-b p-3 transition-colors hover:bg-zinc-50 last:border-b-0"
            >
              <p className="font-medium">
                {item.numero} • {formatarNome(item.nomeEn)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
