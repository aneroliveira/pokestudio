import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import indiceData from "@/data/pokemonIndex.json";
import type { ItemIndicePokemon } from "@/models/indice";
import { getRegion } from "@/utils/getRegion";
import { obterSpritePokemon, formatarNomePokemon } from "@/utils";

const INDICE = indiceData as ItemIndicePokemon[];

/** Ordem de exibição — a mesma ordem cronológica das gerações, que também
 *  é a ordem em que `getRegion` cobre as faixas de número da Pokédex. */
const REGIOES = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
  "Galar",
  "Paldea",
] as const;

const PORCAO_POR_REGIAO = new Map<string, ItemIndicePokemon[]>();
for (const item of INDICE) {
  const regiao = getRegion(item.id);
  const lista = PORCAO_POR_REGIAO.get(regiao);
  if (lista) {
    lista.push(item);
  } else {
    PORCAO_POR_REGIAO.set(regiao, [item]);
  }
}

type PokedexGridProps = {
  onSelect: (item: ItemIndicePokemon) => void;
};

/** Grade com todos os Pokémon do índice (1025, mesma fonte da busca),
 *  separados por região/geração, tudo numa rolagem só — a lateral (fixa
 *  ao lado da grade, acompanha o scroll) é só atalho pra pular direto pra
 *  região certa, sem precisar rolar a página inteira. No celular a lista
 *  fica no topo quebrando linha e, quando sai da tela, vira uma faixa
 *  grudada embaixo do header. Clicar num quadrado chama `onSelect`, igual
 *  a um resultado de busca ou um chip de recente — o card individual abre
 *  do mesmo jeito. */
export function PokedexGrid({ onSelect }: PokedexGridProps) {
  const [regiaoVisivel, setRegiaoVisivel] = useState<string>(REGIOES[0]);
  const [mostrarFaixa, setMostrarFaixa] = useState(false);
  const navTopoRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Sem IntersectionObserver — com 9 seções só, basta achar a última
    // cujo topo já passou da linha do header (+ a faixa, no celular).
    function aoRolar() {
      const limiar = 120;
      let atual: string = REGIOES[0];

      for (const regiao of REGIOES) {
        const el = document.getElementById(`regiao-${regiao.toLowerCase()}`);
        if (el && el.getBoundingClientRect().top <= limiar) {
          atual = regiao;
        }
      }

      setRegiaoVisivel(atual);

      // A faixa só entra quando a lista do topo já sumiu atrás do header
      // (56px, top-14) — antes disso as duas apareceriam juntas.
      const navTopo = navTopoRef.current;
      setMostrarFaixa(
        navTopo !== null && navTopo.getBoundingClientRect().bottom <= 56,
      );
    }

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    // O chip ativo pode estar fora da área visível da faixa — rola só a
    // faixa (scrollIntoView rolaria a página junto). `clientWidth` zerado =
    // sm:hidden; `offsetParent` não serve aqui porque é sempre null em
    // elemento `fixed`.
    const faixa = faixaRef.current;
    const ativo = faixa?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!faixa || !ativo || faixa.clientWidth === 0) return;
    faixa.scrollTo({
      left: ativo.offsetLeft - faixa.clientWidth / 2 + ativo.clientWidth / 2,
      behavior: "smooth",
    });
  }, [regiaoVisivel, mostrarFaixa]);

  function atalhos(faixa: boolean) {
    return REGIOES.map((regiao) => {
      const ativa = regiao === regiaoVisivel;

      return (
        <a
          key={regiao}
          href={`#regiao-${regiao.toLowerCase()}`}
          aria-current={ativa || undefined}
          className={cn(
            "rounded-full border px-3 py-1 text-left text-xs font-medium transition",
            faixa
              ? "shrink-0 whitespace-nowrap"
              : "sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm",
            ativa
              ? "border-primary bg-primary/10 text-primary sm:border-transparent"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground sm:border-transparent sm:hover:bg-secondary/60",
          )}
        >
          {regiao}
        </a>
      );
    });
  }

  return (
    <div className="sm:flex sm:items-start sm:gap-6">
      <nav
        ref={navTopoRef}
        aria-label="Regiões"
        className="flex flex-wrap gap-2 border-b border-border pb-4 sm:sticky sm:top-16 sm:w-36 sm:shrink-0 sm:flex-col sm:flex-nowrap sm:gap-1 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4"
      >
        {atalhos(false)}
      </nav>

      {/* Celular: depois que a lista do topo sai da tela, os mesmos atalhos
          numa faixa só, grudada embaixo do header — dá pra trocar de região
          sem voltar ao topo. */}
      <nav
        ref={faixaRef}
        aria-label="Regiões (atalho)"
        aria-hidden={!mostrarFaixa || undefined}
        className={cn(
          "fixed inset-x-0 top-14 z-30 flex gap-2 overflow-x-auto border-b border-border bg-background/90 px-4 py-2 backdrop-blur-md transition [scrollbar-width:none] sm:hidden",
          mostrarFaixa
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        {atalhos(true)}
      </nav>

      <div className="mt-6 min-w-0 flex-1 space-y-8 sm:mt-0">
        {REGIOES.map((regiao) => {
          const itens = PORCAO_POR_REGIAO.get(regiao) ?? [];
          if (itens.length === 0) return null;

          return (
            <section
              key={regiao}
              id={`regiao-${regiao.toLowerCase()}`}
              className="scroll-mt-28 space-y-3 sm:scroll-mt-20"
            >
              <h2 className="text-lg font-semibold">{regiao}</h2>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                {itens.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    title={formatarNomePokemon(item.nomeEn)}
                    className="flex flex-col items-center gap-1 rounded-xl border border-border/60 p-2 text-center transition hover:border-primary/40 hover:bg-secondary/40"
                  >
                    {/* <img> comum, não next/image — a Pokédex inteira soma
                        1025 sprites, e o carregamento nativo preguiçoso do
                        navegador já dá conta sem passar todos pelo
                        otimizador de imagem do Next (que faria 1025
                        requisições de otimização de uma vez). */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={obterSpritePokemon(item.id)}
                      alt=""
                      loading="lazy"
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {item.numero}
                    </span>
                    <span className="w-full truncate text-[11px] font-medium">
                      {formatarNomePokemon(item.nomeEn)}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
