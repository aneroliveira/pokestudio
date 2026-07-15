import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeBadge } from "@/components/ui/TypeBadge";
import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <p className="text-sm text-zinc-500">
          {pokemon.numero || "#000"}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.nome || "Pokémon"}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.tipos.length > 0 ? (
            pokemon.tipos.map((tipo) => (
              <TypeBadge
                key={tipo}
                label={tipo}
              />
            ))
          ) : (
            <span className="text-sm text-zinc-500">
              Sem tipos
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-zinc-700">
          🗡️ Função: {pokemon.funcao}
        </p>

        <div className="flex flex-col items-center gap-3">
          {pokemon.imagem ? (
            <Image
              src={pokemon.imagem}
              alt={pokemon.nome || "Pokémon"}
              width={120}
              height={120}
            />
          ) : (
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-100 text-center text-sm text-zinc-500">
              Sem imagem
            </div>
          )}

          <PriorityBadge value={pokemon.tier} />
        </div>
      </div>
    </div>
  )
}