import { Footprints } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
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
        {encontros.map((encontro) => (
          <div key={encontro.nome} className="flex items-center gap-3 py-2.5">
            <div className="flex shrink-0 -space-x-1">
              {encontro.tipos.map((tipo) => (
                <TypeIcon
                  key={tipo}
                  tipo={tipo}
                  compact
                  className="bg-secondary ring-2 ring-card"
                />
              ))}
            </div>
            <span className="font-medium">{encontro.nome}</span>
            <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
              {encontro.shiny && <span aria-hidden>✨</span>}
              {encontro.nota}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
