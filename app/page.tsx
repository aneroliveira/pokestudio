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

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const resultados = buscarPokemon(pesquisa);
  const pokemonSelecionado = resultados[0] ?? null;
  return (
    <PageContainer>
      <div className="w-full max-w-3xl space-y-6">

        <SectionTitle
          title="PokéStudio da Lori"
          subtitle="A companheira para decisões inteligentes no Pokémon GO."
        />
        <SearchBar
          value={pesquisa}
          onChange={setPesquisa}
        />
        {pokemonSelecionado ? (
          <Card>
            <PokemonHeader pokemon={pokemonSelecionado} />

            <div className="mt-6">
              <StarRating value={5} />
            </div>
          </Card>
        ) : (
          <EmptyState />
        )}

      </div>
    </PageContainer>
  );
}