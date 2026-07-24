import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { PokemonHundos } from "@/components/pokemon/PokemonHundos";
import { Card } from "@/components/ui/Card";
import type { Pokemon } from "@/models/pokemon";
import { PokemonDecision } from "@/components/pokemon/PokemonDecision";
import { PokemonCombat } from "@/components/pokemon/PokemonCombat";
import { PokemonMegas } from "@/components/pokemon/PokemonMegas";
import { PokemonObservations } from "@/components/pokemon/PokemonObservations";
import { StarRating } from "@/components/ui/StarRating";

type PokemonCardProps = {
  pokemon: Pokemon;
  preview?: boolean;
};

export function PokemonCard({
  pokemon,
  preview = false,
}: PokemonCardProps) {
  return (
    <Card>
      <PokemonHeader pokemon={pokemon} />

      <PokemonDecision
        pokemon={pokemon}
        emptyMessage={
          preview
            ? "Nenhuma decisão cadastrada."
            : undefined
        }
      />

      <div className="mt-6">
        <StarRating value={5} />
      </div>

      <PokemonHundos pokemon={pokemon} />

      <PokemonCombat pokemon={pokemon} />

      <PokemonMegas pokemon={pokemon} />

      <PokemonObservations pokemon={pokemon} />
    </Card>
  );
}