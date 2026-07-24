import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeIcon } from "@/components/ui/TypeIcon";
import Image from "next/image";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">
          {pokemon.oficial.numero || "#000"}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.oficial.nome.ptBR || "Pokémon"}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.oficial.tipos.length > 0 ? (
            pokemon.oficial.tipos.map((tipo) => (
              <TypeIcon
                key={tipo}
                tipo={tipo}
                className="bg-secondary"
                compact
              />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Sem tipos
            </span>
          )}
        </div>

        <div className="mt-3">
          <PriorityBadge value={pokemon.studio.estrategia.tier} />
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2">
        {pokemon.oficial.imagem ? (
          <Image
            src={pokemon.oficial.imagem}
            alt={pokemon.oficial.nome.ptBR || "Pokémon"}
            width={104}
            height={104}
          />
        ) : (
          <div className="flex h-[104px] w-[104px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted text-center text-xs text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
    </div>
  )
}