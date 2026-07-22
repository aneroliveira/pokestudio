"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { SearchBar } from "@/components/pokemon/SearchBar";
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
      <div className="w-full max-w-3xl space-y-6">
        <SectionTitle
          title="PokéStudio da Lori"
          subtitle="A companheira para decisões inteligentes no Pokémon GO."
        />

        <SearchBar
          value={pesquisa}
          onChange={(valor) => {
            setPesquisa(valor);
          }}
          onSelect={selecionarPokemon}
          resultados={resultados}
        />

        <div className="flex justify-start">
          <Link
            href="/searchIV"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ir para a calculadora de IV / nível →
          </Link>
        </div>

        {carregando ? (
          <p className="text-center text-sm text-zinc-500">
            Carregando dados oficiais...
          </p>
        ) : pokemonSelecionado ? (
          <PokemonCard pokemon={pokemonSelecionado} />
        ) : (
          <EmptyState />
        )}
      </div>
    </PageContainer>
  );
}
