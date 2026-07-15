"use client";
import { useState } from "react";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";
import { PokemonForm } from "@/components/admin/PokemonForm";
import { JsonPreview } from "@/components/admin/JsonPreview";
import { PokemonPreview } from "@/components/admin/PokemonPreview";
import { PokemonDecision } from "@/components/pokemon/PokemonDecision";
import { PreviewPanel } from "@/components/admin/PreviewPanel";

export default function AdminPage() {
    const [pokemon, setPokemon] = useState(
        createEmptyPokemon()
    );
    return (
        <main className="mx-auto max-w-7xl p-8">
            <h1 className="text-3xl font-bold">
                Cadastro de Pokémon
            </h1>

            <p className="mt-2 text-zinc-500">
                Ferramenta interna do PokéStudio
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <PokemonForm
                    pokemon={pokemon}
                    setPokemon={setPokemon}
                />

                <PreviewPanel
                    pokemon={pokemon}
                />
            </div>
        </main>
    );
}
