import { Compass } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { ATACANTES_POR_TIPO } from "@/data/atacantesPorTipo";

/** Atalhos pra pular direto pra seção de cada tipo, mais rápido que rolar
 *  a página inteira — mesma ideia da navegação rápida dos eventos, mas
 *  como âncoras dentro da própria página (não há "voltar", é tudo aqui).
 *  Fixo ao rolar (só esse card, sem a legenda — ver LegendaAtacantes),
 *  teste pra manter o atalho sempre à mão numa lista longa. */
export function NavegacaoTipos() {
  return (
    <Card className="sm:sticky sm:top-16 sm:z-30">
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
  );
}
