import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeBadge } from "@/components/ui/TypeBadge";
import Image from "next/image";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <p className="text-sm text-zinc-500">
          {pokemon.oficial.numero || "#000"}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.oficial.nome.ptBR || "Pokémon"}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.oficial.tipos.length > 0 ? (
            pokemon.oficial.tipos.map((tipo) => (
              <TypeBadge
                key={tipo}
                tipo={tipo}
              />
            ))
          ) : (
            <span className="text-sm text-zinc-500">
              Sem tipos
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-zinc-700">
          🗡️ Função: {pokemon.studio.estrategia.funcao}
        </p>

        <div className="flex flex-col items-center gap-3">
          {pokemon.oficial.imagem ? (
            <Image
              src={pokemon.oficial.imagem}
              alt={pokemon.oficial.nome.ptBR || "Pokémon"}
              width={120}
              height={120}
            />
          ) : (
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-100 text-center text-sm text-zinc-500">
              Sem imagem
            </div>
          )}

          <PriorityBadge value={pokemon.studio.estrategia.tier} />
        </div>
      </div>
    </div>
  )
}