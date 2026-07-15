"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Pokemon } from "@/models/pokemon";
import { buscarPokemon } from "@/services/pokemon";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonDecision } from "@/components/pokemon/PokemonDecision";

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Pokemon | null>(null);

  const resultados = buscarPokemon(pesquisa);

  function selecionarPokemon(pokemon: Pokemon) {
    setPokemonSelecionado(pokemon);
    setPesquisa(pokemon.nome);
  }

  return (
    <PageContainer>
      <div className="w-full max-w-3xl space-y-6">
        <SectionTitle
          title="PokéStudio da Lori"
          subtitle="A companheira para decisões inteligentes no Pokémon GO."
        />

        <SearchBar
          value={pesquisa}
          onChange={(valor) => {
            setPesquisa(valor);
            setPokemonSelecionado(null);
          }}
          onSelect={selecionarPokemon}
          resultados={resultados}
        />
        {pokemonSelecionado ? (
          <PokemonCard
            pokemon={pokemonSelecionado}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </PageContainer>
  );
}
