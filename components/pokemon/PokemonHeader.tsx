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
          {pokemon.numero}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.nome}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.tipos.map((tipo) => (
            <TypeBadge
              key={tipo}
              label={tipo}
            />
          ))}
        </div>

        <p className="mt-3 text-zinc-500">
          {pokemon.descricao}
        </p>
        <div className="mt-4">
  <StarRating value={5} />
</div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-3">
        <Image
          src={pokemon.imagem}
          alt={pokemon.nome}
          width={120}
height={120}
          priority
        />

        <PriorityBadge value={pokemon.tier} />
      </div>
    </div>
  );
}