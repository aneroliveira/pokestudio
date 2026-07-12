import type { Pokemon } from "@/models/pokemon";

type PokemonHundosProps = {
  pokemon: Pokemon;
};

export function PokemonHundos({ pokemon }: PokemonHundosProps) {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-lg font-semibold">
        Hundos
      </h2>

      <div className="space-y-2">

        {pokemon.hundos.raidNivel20 && (
          <div className="flex justify-between">
            <span>Raid N20</span>
            <strong>{pokemon.hundos.raidNivel20}</strong>
          </div>
        )}

        {pokemon.hundos.raidNivel25 && (
          <div className="flex justify-between">
            <span>Raid Weather</span>
            <strong>{pokemon.hundos.raidNivel25}</strong>
          </div>
        )}

        <hr className="my-3" />

        {pokemon.quaseHundos.iv98 && (
          <div className="flex justify-between">
            <span>98%</span>
            <strong>{pokemon.quaseHundos.iv98}</strong>
          </div>
        )}

        {pokemon.quaseHundos.iv96 && (
          <div className="flex justify-between">
            <span>96%</span>
            <strong>{pokemon.quaseHundos.iv96}</strong>
          </div>
        )}

      </div>
    </div>
  );
}