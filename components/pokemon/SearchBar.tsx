import { Search } from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import type { ItemIndicePokemon } from "@/models/indice";
import type { StudioMap } from "@/services/pokemon/studioStore";
import { obterImagemPokemon } from "@/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (item: ItemIndicePokemon) => void;
  placeholder?: string;
  resultados: ItemIndicePokemon[];
  studioMap?: StudioMap;
  autoFocus?: boolean;
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
  studioMap = {},
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="border-border pl-10"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Digite o nome (em inglês) ou o número da Pokédex.
      </p>

      {value && resultados.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-popover shadow-sm">
          {resultados.map((item) => {
            const tier = studioMap[item.numero]?.estrategia.tier;

            return (
              <div
                key={item.numero}
                onClick={() => onSelect(item)}
                className="flex cursor-pointer items-center gap-3 border-b border-border p-3 transition-colors hover:bg-accent last:border-b-0"
              >
                <Image
                  src={obterImagemPokemon(item.id)}
                  alt=""
                  width={40}
                  height={40}
                  className="shrink-0"
                />

                <p className="flex-1 font-medium">
                  {item.numero} • {formatarNome(item.nomeEn)}
                </p>

                {tier && <PriorityBadge value={tier} />}
              </div>
            );
          })}
        </div>
      )}

      {value && resultados.length === 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Nenhum Pokémon encontrado para &ldquo;{value}&rdquo;.
        </p>
      )}
    </div>
  );
}
