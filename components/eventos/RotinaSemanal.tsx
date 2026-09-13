import { CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ROTINA_SEMANAL } from "@/data/eventos/rotinaSemanal";

/** Lista estática da rotina semanal fixa — não é um Evento, não tem estado
 *  (ativo/em-breve/encerrado), só lista o que se repete toda semana. Cada
 *  dia vira um bloco (dia em destaque, título do que rola, detalhe em
 *  texto corrido), em vez de colunas de tabela. */
export function RotinaSemanal() {
  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
        Rotina semanal
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
        {ROTINA_SEMANAL.map((item) => (
          <div key={item.dia}>
            <h3 className="text-xl font-bold">{item.dia}</h3>
            <h4 className="mt-0.5 text-base font-semibold text-foreground/90">
              {item.titulo}
            </h4>
            {item.detalhe && (
              <p className="mt-0.5 text-sm text-muted-foreground">{item.detalhe}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
