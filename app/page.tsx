"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUp, FileText, Zap } from "lucide-react";

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
import { PokemonPocketCard } from "@/components/pokemon/PokemonPocketCard";

const ABAS = ["Buscar", "Pokédex"] as const;
type Aba = (typeof ABAS)[number];

// RFC-005: a ficha rápida (antiga /pocket) é um modo de visualização da
// Home. O modo escolhido fica só neste navegador — se o storage falhar,
// volta pra Completa sem quebrar nada. `?modo=rapida` (pra onde a /pocket
// redireciona) tem prioridade sobre o que está salvo.
const MODOS = ["Completa", "Rápida"] as const;
type ModoFicha = (typeof MODOS)[number];
const CHAVE_MODO = "pokestudio:modo-ficha";

function lerModo(): ModoFicha {
  const daUrl = new URLSearchParams(window.location.search).get("modo");
  if (daUrl === "rapida") return "Rápida";
  if (daUrl === "completa") return "Completa";

  try {
    const salvo = window.localStorage.getItem(CHAVE_MODO);
    return salvo === "Rápida" ? "Rápida" : "Completa";
  } catch {
    return "Completa";
  }
}

function salvarModo(modo: ModoFicha) {
  try {
    window.localStorage.setItem(CHAVE_MODO, modo);
  } catch {
    // Sem storage o modo só não é lembrado na próxima visita.
  }
}

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
  const [modo, setModo] = useState<ModoFicha>("Completa");

  function trocarModo(novo: ModoFicha) {
    setModo(novo);
    salvarModo(novo);
  }

  const resultados = buscarPokemon(pesquisa);

  useEffect(() => {
    // Recentes só existem no localStorage do navegador — não dá pra ler
    // durante o SSR, então entra num efeito mesmo — o modo de ficha salvo
    // vem do mesmo lugar e pelo mesmo motivo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentes(lerRecentes());
    setModo(lerModo());

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

              {/* Recentes à esquerda, seletor de ficha à direita na mesma
                  linha — o seletor só aparece quando tem um Pokémon aberto. */}
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <ChipsRecentes
                    itens={recentes}
                    onSelect={selecionarPokemon}
                  />
                </div>

                {/* Celular: o mesmo seletor, só com ícones (documento =
                    completa, raio = rápida) — com texto apertava os chips.
                    Mostrar as duas opções deixa claro que é uma escolha. */}
                {pokemonSelecionado && (
                  <div
                    role="group"
                    aria-label="Tipo de ficha"
                    className="inline-flex shrink-0 rounded-lg bg-muted p-0.5 sm:hidden"
                  >
                    {MODOS.map((item) => {
                      const Icone = item === "Completa" ? FileText : Zap;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => trocarModo(item)}
                          aria-pressed={modo === item}
                          aria-label={`Ficha ${item.toLowerCase()}`}
                          title={`Ficha ${item.toLowerCase()}`}
                          className={cn(
                            "flex h-6 w-7 items-center justify-center rounded-md transition",
                            modo === item
                              ? "bg-card text-primary shadow-sm"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <Icone className="h-3.5 w-3.5" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {pokemonSelecionado && (
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <span className="text-xs text-muted-foreground">Ver</span>
                    <div className="inline-flex rounded-lg bg-muted p-0.5">
                      {MODOS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => trocarModo(item)}
                          aria-pressed={modo === item}
                          className={cn(
                            "rounded-md px-3 py-1 text-xs font-medium transition",
                            modo === item
                              ? "bg-card text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
              modo === "Rápida" ? (
                <PokemonPocketCard pokemon={pokemonSelecionado} />
              ) : (
                <PokemonCard
                  pokemon={pokemonSelecionado}
                  onSelecionarPokemon={selecionarPokemon}
                />
              )
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
