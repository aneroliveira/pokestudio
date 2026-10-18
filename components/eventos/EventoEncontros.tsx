import { Footprints } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { SpriteEvento } from "@/components/eventos/SpriteEvento";
import { especiePorNome } from "@/services/eventos/especiePokemon";
import type { EncontroEvento } from "@/models/evento";

type EventoEncontrosProps = {
  encontros: EncontroEvento[];
};

export function EventoEncontros({ encontros }: EventoEncontrosProps) {
  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Footprints className="h-4 w-4 text-muted-foreground" />
        Encontros no Selvagem
      </h2>

      <div className="mt-4 divide-y divide-border/50">
        {encontros.map((encontro) => {
          const especie = especiePorNome(encontro.nome);

          return (
            <div key={encontro.nome} className="flex items-center gap-3 py-2.5">
              {especie && <SpriteEvento especie={especie} />}
              {/* Celular: a nota vai pra baixo do nome — na mesma linha, com
                  o sprite, ela espremia em 4–5 linhas. */}
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                <span className="flex items-center gap-1.5 font-medium">
                  {encontro.nome}
                  <span className="flex shrink-0 gap-0.5">
                    {encontro.tipos.map((tipo) => (
                      <TypeIcon key={tipo} tipo={tipo} mini className="bg-secondary" />
                    ))}
                  </span>
                </span>
                <span className="mt-0.5 flex items-start gap-1 text-xs text-muted-foreground sm:ml-auto sm:mt-0 sm:items-center sm:text-right sm:text-sm">
                  {encontro.shiny && <span aria-hidden>✨</span>}
                  {encontro.nota}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
