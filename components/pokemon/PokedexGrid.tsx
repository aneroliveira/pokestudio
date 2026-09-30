import { useEffect, useState } from "react";
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
 *  região certa, sem precisar rolar a página inteira. Clicar num
 *  quadrado chama `onSelect`, igual a um resultado de busca ou um chip
 *  de recente — o card individual abre do mesmo jeito. */
export function PokedexGrid({ onSelect }: PokedexGridProps) {
  const [regiaoVisivel, setRegiaoVisivel] = useState<string>(REGIOES[0]);

  useEffect(() => {
    // Sem IntersectionObserver — com 9 seções só, basta achar a última
    // cujo topo já passou da linha do header (a lateral acompanha o
    // scroll, então não tem sobreposição adicional pra descontar).
    function aoRolar() {
      const limiar = 100;
      let atual: string = REGIOES[0];

      for (const regiao of REGIOES) {
        const el = document.getElementById(`regiao-${regiao.toLowerCase()}`);
        if (el && el.getBoundingClientRect().top <= limiar) {
          atual = regiao;
        }
      }

      setRegiaoVisivel(atual);
    }

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div className="sm:flex sm:items-start sm:gap-6">
      <nav
        aria-label="Regiões"
        className="flex flex-wrap gap-2 border-b border-border pb-4 sm:sticky sm:top-16 sm:w-36 sm:shrink-0 sm:flex-col sm:flex-nowrap sm:gap-1 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4"
      >
        {REGIOES.map((regiao) => {
          const ativa = regiao === regiaoVisivel;

          return (
            <a
              key={regiao}
              href={`#regiao-${regiao.toLowerCase()}`}
              aria-current={ativa || undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-left text-xs font-medium transition sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm",
                ativa
                  ? "border-primary bg-primary/10 text-primary sm:border-transparent"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground sm:border-transparent sm:hover:bg-secondary/60",
              )}
            >
              {regiao}
            </a>
          );
        })}
      </nav>

      <div className="mt-6 min-w-0 flex-1 space-y-8 sm:mt-0">
        {REGIOES.map((regiao) => {
          const itens = PORCAO_POR_REGIAO.get(regiao) ?? [];
          if (itens.length === 0) return null;

          return (
            <section
              key={regiao}
              id={`regiao-${regiao.toLowerCase()}`}
              className="scroll-mt-20 space-y-3"
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
