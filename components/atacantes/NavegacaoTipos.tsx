"use client";

import { useEffect, useRef } from "react";
import { Compass } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { ATACANTES_POR_TIPO } from "@/data/atacantesPorTipo";

/** Altura do MainHeader (sticky top-0), em px — soma com a altura medida
 *  deste card pra calcular o scroll-margin-top de cada seção de tipo (ver
 *  RankingTipo). Sem isso, clicar num atalho deixava o título escondido
 *  atrás da barra fixa em vez de aparecer logo abaixo dela. */
const ALTURA_HEADER_PX = 64;

/** Atalhos pra pular direto pra seção de cada tipo, mais rápido que rolar
 *  a página inteira — mesma ideia da navegação rápida dos eventos, mas
 *  como âncoras dentro da própria página (não há "voltar", é tudo aqui).
 *  Fixo ao rolar (só esse card, sem a legenda — ver LegendaAtacantes),
 *  teste pra manter o atalho sempre à mão numa lista longa. */
export function NavegacaoTipos() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = wrapperRef.current;
    if (!elemento) return;

    function medir() {
      // Só soma a altura do card quando ele realmente está fixo (sm+) —
      // no mobile ele rola junto com o resto, não precisa de folga extra.
      const fixo = window.matchMedia("(min-width: 640px)").matches;
      const altura = fixo ? elemento!.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty(
        "--offset-atacantes",
        `${ALTURA_HEADER_PX + altura}px`,
      );
    }

    medir();
    const observer = new ResizeObserver(medir);
    observer.observe(elemento);
    window.addEventListener("resize", medir);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", medir);
      document.documentElement.style.removeProperty("--offset-atacantes");
    };
  }, []);

  return (
    <div ref={wrapperRef} className="sm:sticky sm:top-16 sm:z-30">
      <Card>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Compass className="h-4 w-4 text-muted-foreground" />
          Ir direto pro tipo
        </h2>

        <nav
          aria-label="Atalhos por tipo"
          className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 md:grid-cols-6"
        >
          {ATACANTES_POR_TIPO.map(({ tipo }) => (
            <a
              key={tipo}
              href={`#${tipo.toLowerCase()}`}
              className="-mx-1 rounded-full px-1 transition hover:bg-secondary/60"
            >
              <TypeIcon tipo={tipo} compact mostrarNome />
            </a>
          ))}
        </nav>
      </Card>
    </div>
  );
}
