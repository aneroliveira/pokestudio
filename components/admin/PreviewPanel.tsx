import type { Pokemon } from "@/models/pokemon";

import { PokemonPreview } from "./PokemonPreview";
import { JsonPreview } from "./JsonPreview";

type PreviewPanelProps = {
  pokemon: Pokemon;
};

export function PreviewPanel({
  pokemon,
}: PreviewPanelProps) {
  return (
    <div className="space-y-8">
      <PokemonPreview pokemon={pokemon} />

      <JsonPreview pokemon={pokemon} />
    </div>
  );
}