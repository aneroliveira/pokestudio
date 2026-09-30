"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/pokemon/EmptyState";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { ChipsRecentes } from "@/components/pokemon/ChipsRecentes";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCardSkeleton";
import { PokedexGrid } from "@/components/pokemon/PokedexGrid";
import { NavegacaoVizinhos } from "@/components/pokemon/NavegacaoVizinhos";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
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

const ABAS = ["Buscar", "Pokédex"] as const;
type Aba = (typeof ABAS)[number];

function assinarScroll(retorno: () => void) {
  window.addEventListener("scroll", retorno, { passive: true });
  return () => window.removeEventListener("scroll", retorno);
}

function leuPassouDoTopo() {
  return window.scrollY > 300;
}

function leuPassouDoTopoServidor() {
  return false;
}

/** Só mostra o "voltar ao topo" depois de rolar um pouco — perto do topo
 *  o botão não serve pra nada, só ocupa espaço na tela. */
function useMostrarBotaoTopo() {
  return useSyncExternalStore(
    assinarScroll,
    leuPassouDoTopo,
    leuPassouDoTopoServidor,
  );
}

export default function Home() {
  const [aba, setAba] = useState<Aba>("Buscar");
  const mostrarBotaoTopo = useMostrarBotaoTopo();
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

  // A Pokédex é só uma porta de entrada visual — selecionar um quadrado
  // volta pra aba de busca pra revelar o card, igual clicar num resultado
  // de busca ou num chip de recente.
  function selecionarDaPokedex(item: ItemIndicePokemon) {
    setAba("Buscar");
    selecionarPokemon(item);
  }

  return (
    <PageContainer>
      <div
        id="topo"
        className={cn(
          "w-full scroll-mt-20 space-y-6",
          aba === "Pokédex" ? "max-w-5xl" : "max-w-2xl",
        )}
      >
        <SectionTitle
          title="PokéPocket da Lori"
          // title="PokéStudio da Lori" // nome anterior, antes do domínio pogopocket.vercel.app
          subtitle="O companheiro para decisões inteligentes no Pokémon GO."
        />

        <Tabs abas={ABAS} ativa={aba} onChange={setAba} />

        {aba === "Pokédex" ? (
          <PokedexGrid onSelect={selecionarDaPokedex} />
        ) : (
          <>
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

            {pokemonSelecionado && (
              <NavegacaoVizinhos
                numero={pokemonSelecionado.oficial.numero}
                onSelect={selecionarPokemon}
                desabilitado={carregando}
              />
            )}

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
          </>
        )}
      </div>

      {aba === "Pokédex" && mostrarBotaoTopo && (
        <>
          {/* Mobile: canto da tela — o conteúdo já ocupa quase a largura
              toda, então "perto do conteúdo" já é aqui. */}
          <a
            href="#topo"
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-secondary sm:hidden"
          >
            <ArrowUp className="h-5 w-5" />
          </a>

          {/* Desktop: alinhado com a borda direita do conteúdo (max-w-5xl
              na Pokédex), não com o canto do viewport. */}
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden sm:block">
            <div className="relative mx-auto w-full max-w-5xl">
              <a
                href="#topo"
                aria-label="Voltar ao topo"
                title="Voltar ao topo"
                className="pointer-events-auto absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-secondary"
              >
                <ArrowUp className="h-5 w-5" />
              </a>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
