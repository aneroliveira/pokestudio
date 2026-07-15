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
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          100%
        </h3>
        {pokemon.hundos.semClima && (
          <InfoRow
            label="Sem clima"
            value={pokemon.hundos.semClima}
          />
        )}

        {pokemon.hundos.comClima && (
          <InfoRow
            label="Com clima"
            value={pokemon.hundos.comClima}
          />
        )}

        <hr className="my-3" />

        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Quase Hundos
        </h3>

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