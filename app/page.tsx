"use client";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StarRating } from "@/components/ui/StarRating";
import { buscarPokemon } from "@/services/pokemon";
import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { PokemonUsage } from "@/components/pokemon/PokemonUsage";

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const resultados = buscarPokemon(pesquisa);

  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Pokemon | null>(null);

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

            <PokemonUsage pokemon={pokemonSelecionado} />
          </Card>
        ) : (
          <EmptyState />
        )}

      </div>
    </PageContainer>
  );
}