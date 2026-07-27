import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { PokemonHundos } from "@/components/pokemon/PokemonHundos";
import { Card } from "@/components/ui/Card";
import type { Pokemon } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { PokemonDecision } from "@/components/pokemon/PokemonDecision";
import { PokemonCombat } from "@/components/pokemon/PokemonCombat";
import { PokemonMegas } from "@/components/pokemon/PokemonMegas";
import { PokemonObservations } from "@/components/pokemon/PokemonObservations";
import { PokemonEvolutions } from "@/components/pokemon/PokemonEvolutions";

type PokemonCardProps = {
  pokemon: Pokemon;
  onSelecionarPokemon?: (item: ItemIndicePokemon) => void;
};

export function PokemonCard({
  pokemon,
  onSelecionarPokemon,
}: PokemonCardProps) {
  return (
    <Card>
      <PokemonHeader pokemon={pokemon} />

      <PokemonDecision pokemon={pokemon} />

      <PokemonHundos pokemon={pokemon} />

      <PokemonCombat pokemon={pokemon} />

      <PokemonMegas pokemon={pokemon} />

      <PokemonEvolutions
        pokemon={pokemon}
        onSelecionarPokemon={onSelecionarPokemon}
      />

      <PokemonObservations pokemon={pokemon} />
    </Card>
  );
}