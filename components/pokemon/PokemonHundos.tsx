import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoRow } from "@/components/ui/InfoRow";

type PokemonHundosProps = {
  pokemon: Pokemon;
};

export function PokemonHundos({ pokemon }: PokemonHundosProps) {
  return (
    <SectionCard title="Hundos">
      <div className="space-y-2">
        {pokemon.hundos.raidNivel20 && (
          <InfoRow
            label="Raid N20"
            value={pokemon.hundos.raidNivel20}
          />
        )}

        {pokemon.hundos.raidNivel25 && (
          <InfoRow
            label="Raid N25"
            value={pokemon.hundos.raidNivel25}
          />
        )}

        <hr className="my-3" />

        {pokemon.quaseHundos.iv98 && (
          <InfoRow
            label="98%"
            value={pokemon.quaseHundos.iv98}
          />
        )}

        {pokemon.quaseHundos.iv96 && (
          <InfoRow
            label="96%"
            value={pokemon.quaseHundos.iv96}
          />
        )}
      </div>
    </SectionCard>
  );
}