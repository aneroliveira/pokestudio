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
        {pokemon.studio.go.hundos.semClima != null && (
          <InfoRow
            label="Sem clima"
            value={pokemon.studio.go.hundos.semClima}
          />
        )}

        {pokemon.studio.go.hundos.comClima != null && (
          <InfoRow
            label="Com clima"
            value={pokemon.studio.go.hundos.comClima}
          />
        )}

        <hr className="my-3" />

        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Quase Hundos
        </h3>

        {pokemon.studio.go.quaseHundos.iv98 != null && (
          <InfoRow
            label="98%"
            value={pokemon.studio.go.quaseHundos.iv98}
          />
        )}

        {pokemon.studio.go.quaseHundos.iv96 != null && (
          <InfoRow
            label="96%"
            value={pokemon.studio.go.quaseHundos.iv96}
          />
        )}
      </div>
    </SectionCard>
  );
}