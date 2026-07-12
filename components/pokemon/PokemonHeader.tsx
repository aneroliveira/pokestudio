import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-zinc-500">
          {pokemon.numero}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.nome}
        </h2>

        <p className="mt-2 text-zinc-500">
          {pokemon.descricao}
        </p>
      </div>

      <PriorityBadge value={pokemon.tier} />
    </div>
  );
}