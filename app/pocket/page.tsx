"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCardSkeleton";
import { PokemonPocketCard } from "@/components/pokemon/PokemonPocketCard";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Pokemon } from "@/models/pokemon";
import {
  buscarPokemon,
  montarPokemon,
  studioDoMapa,
} from "@/services/pokemon";
import {
  carregarStudioMap,
  type StudioMap,
} from "@/services/pokemon/studioStore";

/** Espera a digitação pausar antes de montar todos os Pokémon encontrados —
 *  cada resultado dispara uma busca na PokéAPI, então digitar rápido não
 *  pode disparar uma leva de fetches por tecla. */
const ATRASO_BUSCA_MS = 300;

export default function PocketPage() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [studioMap, setStudioMap] = useState<StudioMap>({});

  useEffect(() => {
    let cancelado = false;

    carregarStudioMap()
      .then((mapa) => {
        if (!cancelado) setStudioMap(mapa);
      })
      .catch(() => {
        if (!cancelado) setStudioMap({});
      });

    return () => {
      cancelado = true;
    };
  }, []);

  // O caso "busca vazia" limpa a lista sem esperar o debounce, e por isso
  // chama setState direto no efeito. Vale reescrever um dia derivando o
  // estado vazio no render — hoje seria mexer no debounce sem necessidade.
  useEffect(() => {
    const resultados = buscarPokemon(pesquisa);

    if (resultados.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPokemons([]);
      setCarregando(false);
      return;
    }

    let cancelado = false;
    setCarregando(true);

    const atraso = setTimeout(() => {
      Promise.all(
        resultados.map((item) =>
          montarPokemon(item, studioDoMapa(studioMap, item.numero)),
        ),
      )
        .then((lista) => {
          if (!cancelado) setPokemons(lista);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          if (!cancelado) setCarregando(false);
        });
    }, ATRASO_BUSCA_MS);

    return () => {
      cancelado = true;
      clearTimeout(atraso);
    };
  }, [pesquisa, studioMap]);

  return (
    <PageContainer>
      <div className="w-full max-w-2xl space-y-6">
        <SectionTitle
          title="Pocket"
          subtitle="Imagem, tipos, fraquezas e CP 100% — a ficha rápida de cada Pokémon."
        />

        <div className="md:sticky md:top-16 md:z-30 md:pb-2 md:backdrop-blur-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              placeholder="Pesquise um Pokémon..."
              autoFocus
              className="border-border pl-10"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Digite o nome (em inglês) ou o número da Pokédex.
          </p>
        </div>

        {!pesquisa ? (
          <EmptyState />
        ) : carregando ? (
          <div className="space-y-4">
            <PokemonCardSkeleton />
          </div>
        ) : pokemons.length > 0 ? (
          <div className="space-y-4">
            {pokemons.map((item) => (
              <PokemonPocketCard key={item.oficial.numero} pokemon={item} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum Pokémon encontrado para &ldquo;{pesquisa}&rdquo;.
          </p>
        )}
      </div>
    </PageContainer>
  );
}
