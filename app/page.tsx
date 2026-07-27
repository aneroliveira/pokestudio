"use client";

import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCardSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Pokemon } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { buscarPokemon } from "@/services/pokemon";
import { importarPokemon } from "@/services/pokemon/importPokemon";
import { mergePokemon } from "@/services/pokemon/mergePokemon";
import {
  carregarStudioMap,
  type StudioMap,
} from "@/services/pokemon/studioStore";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Pokemon | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [studioMap, setStudioMap] = useState<StudioMap>({});

  const resultados = buscarPokemon(pesquisa);

  useEffect(() => {
    carregarStudioMap()
      .then(setStudioMap)
      .catch(() => setStudioMap({}));
  }, []);

  async function selecionarPokemon(item: ItemIndicePokemon) {
    setPesquisa("");
    setCarregando(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const importado = await importarPokemon(item.nomeEn);
      const studio =
        studioMap[item.numero] ?? createEmptyPokemon().studio;

      const base: Pokemon = {
        oficial: createEmptyPokemon().oficial,
        studio,
      };

      setPokemonSelecionado(mergePokemon(base, importado));
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar o Pokémon.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <PageContainer>
      <div className="w-full max-w-2xl space-y-6">
        <SectionTitle
          title="PokéStudio da Lori"
          subtitle="A companheira para decisões inteligentes no Pokémon GO."
        />

        <div className="md:sticky md:top-16 md:z-30 md:pb-2 md:backdrop-blur-md">
          <SearchBar
            value={pesquisa}
            onChange={(valor) => {
              setPesquisa(valor);
            }}
            onSelect={selecionarPokemon}
            resultados={resultados}
            studioMap={studioMap}
            autoFocus
          />
        </div>

        {carregando ? (
          <PokemonCardSkeleton />
        ) : pokemonSelecionado ? (
          <PokemonCard
            pokemon={pokemonSelecionado}
            onSelecionarPokemon={selecionarPokemon}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </PageContainer>
  );
}
