"use client";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StarRating } from "@/components/ui/StarRating";
import { listarPokemons } from "@/services/pokemon";
import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { useState } from "react";

export default function Home() {
  const pokemons = listarPokemons();
  const mewtwo = pokemons[0];
  const [pesquisa, setPesquisa] = useState("");
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
        <Card>
          <PokemonHeader pokemon={mewtwo} />

<div className="mt-6">
  <StarRating value={5} />
</div>

        </Card>

      </div>
    </PageContainer>
  );
}