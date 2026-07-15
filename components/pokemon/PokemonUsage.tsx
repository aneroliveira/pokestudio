import type { Pokemon } from "@/models/pokemon";

type PokemonUsageProps = {
  pokemon: Pokemon;
};

export function PokemonUsage({ pokemon }: PokemonUsageProps) {
  return (
    <div className="mt-6">
      <h2 className="mb-3 text-lg font-semibold">Uso</h2>

      <div className="space-y-2">
        <p>{pokemon.MelhorParaPokemon.raid ? "✅ Raid" : "❌ Raid"}</p>
        <p>{pokemon.MelhorParaPokemon.rocket ? "✅ Team GO Rocket" : "❌ Team GO Rocket"}</p>
        <p>{pokemon.MelhorParaPokemon.ginasio ? "✅ Ginásio" : "⚠️ Ginásio"}</p>
        <p>{pokemon.MelhorParaPokemon.pvp ? "✅ PvP" : "❌ PvP"}</p>
      </div>
    </div>
  );
}