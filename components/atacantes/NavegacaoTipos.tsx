import { Compass } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { ATACANTES_POR_TIPO } from "@/data/atacantesPorTipo";

/** Atalhos pra pular direto pra seção de cada tipo, mais rápido que rolar
 *  a página inteira — mesma ideia da navegação rápida dos eventos, mas
 *  como âncoras dentro da própria página (não há "voltar", é tudo aqui). */
export function NavegacaoTipos() {
  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Compass className="h-4 w-4 text-muted-foreground" />
        Ir direto pro tipo
      </h2>

      <nav
        aria-label="Atalhos por tipo"
        className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-6"
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

      <div className="mt-4 space-y-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground/80">DPS</strong> — dano por
          segundo.
        </p>
        <p>
          <strong className="text-foreground/80">TDO</strong> — dano total
          até &ldquo;morrer&rdquo; em combate (resistência ofensiva).
        </p>
        <p>
          <strong className="text-foreground/80">Score</strong> — nota da
          fonte combinando os dois; é o critério de ordenação do ranking.
        </p>
        <p>
          Golpes com <sup>*</sup> ou <sup>+</sup> são exclusivos/legado
          (Elite TM, Community Day ou evento passado — a fonte não deixa
          clara a diferença exata entre os dois símbolos).
        </p>
      </div>
    </Card>
  );
}
