"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { PokemonHundos } from "@/components/pokemon/PokemonHundos";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StarRating } from "@/components/ui/StarRating";
import type { Pokemon } from "@/models/pokemon";
import { buscarPokemon } from "@/services/pokemon";

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

        {pesquisa && pokemonSelecionado ? (
          <Card>
            <PokemonHeader pokemon={pokemonSelecionado} />

            <div className="mt-6">
              <StarRating value={5} />
            </div>

            <PokemonHundos pokemon={pokemonSelecionado} />
          </Card>
        ) : (
          <EmptyState />
        )}
      </div>
    </PageContainer>
  );
}