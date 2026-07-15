import type { Pokemon } from "@/models/pokemon";

import { PokemonCard } from "@/components/pokemon/PokemonCard";

type PokemonPreviewProps = {
    pokemon: Pokemon;
};

export function PokemonPreview({
    pokemon,
}: PokemonPreviewProps) {
    return (
        <section className="rounded-xl border p-6">

            <h2 className="mb-6 text-xl font-semibold">

                👀 Preview

            </h2>

            <PokemonCard
                pokemon={pokemon}
                preview
            />

        </section>
    );
}