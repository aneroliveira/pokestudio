"use client";

import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { ChipsRecentes } from "@/components/pokemon/ChipsRecentes";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCardSkeleton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Pokemon } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import {
  adicionarRecente,
  buscarPokemon,
  buscarPorNomeEn,
  lerRecentes,
  montarPokemon,
  studioDoMapa,
} from "@/services/pokemon";
import {
  carregarStudioMap,
  type StudioMap,
} from "@/services/pokemon/studioStore";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

export default function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemonSelecionado, setPokemonSelecionado] =
    useState<Pokemon | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [studioMap, setStudioMap] = useState<StudioMap>({});
  const [recentes, setRecentes] = useState<ItemIndicePokemon[]>([]);

  const resultados = buscarPokemon(pesquisa);

  useEffect(() => {
    // Recentes só existem no localStorage do navegador — não dá pra ler
    // durante o SSR, então entra num efeito mesmo (mesmo padrão já usado
    // em app/pocket/page.tsx pro caso de busca vazia).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentes(lerRecentes());

    let cancelado = false;

    async function iniciar() {
      let mapa: StudioMap = {};

      try {
        mapa = await carregarStudioMap();
      } catch {
        mapa = {};
      }

      if (cancelado) return;
      setStudioMap(mapa);

      // Deep link do Plano: `/?p=<slug>` abre o card já montado. Lido do
      // window em vez de useSearchParams para não exigir um boundary de
      // Suspense só por causa de um parâmetro opcional.
      const slug = new URLSearchParams(window.location.search).get("p");
      if (!slug) return;

      const item = buscarPorNomeEn(slug);
      if (!item) return;

      setCarregando(true);

      try {
        const pokemon = await montarPokemon(
          item,
          studioDoMapa(mapa, item.numero),
        );
        if (!cancelado) {
          setPokemonSelecionado(pokemon);
          setRecentes(adicionarRecente(item));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    iniciar();

    return () => {
      cancelado = true;
    };
  }, []);

  async function selecionarPokemon(item: ItemIndicePokemon) {
    setPesquisa("");
    setCarregando(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      setPokemonSelecionado(
        await montarPokemon(item, studioDoMapa(studioMap, item.numero)),
      );
      setRecentes(adicionarRecente(item));
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
          title="PokéPocket da Lori"
          // title="PokéStudio da Lori" // nome anterior, antes do domínio pogopocket.vercel.app
          subtitle="O companheiro para decisões inteligentes no Pokémon GO."
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

          <div className="mt-3">
            <ChipsRecentes itens={recentes} onSelect={selecionarPokemon} />
          </div>
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
