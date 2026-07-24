import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { PokemonHundos } from "@/components/pokemon/PokemonHundos";
import { Card } from "@/components/ui/Card";
import type { Pokemon } from "@/models/pokemon";
import { PokemonDecision } from "@/components/pokemon/PokemonDecision";
import { PokemonCombat } from "@/components/pokemon/PokemonCombat";
import { PokemonMegas } from "@/components/pokemon/PokemonMegas";
import { PokemonObservations } from "@/components/pokemon/PokemonObservations";

type PokemonCardProps = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card>
      <PokemonHeader pokemon={pokemon} />

      <PokemonDecision pokemon={pokemon} />

      <PokemonHundos pokemon={pokemon} />

      <PokemonCombat pokemon={pokemon} />

      <PokemonMegas pokemon={pokemon} />

      <PokemonObservations pokemon={pokemon} />
    </Card>
  );
}