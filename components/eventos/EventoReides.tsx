import { Swords } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import type { GrupoReideEvento } from "@/models/evento";

type EventoReidesProps = {
  grupos: GrupoReideEvento[];
};

export function EventoReides({ grupos }: EventoReidesProps) {
  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Swords className="h-4 w-4 text-muted-foreground" />
        Reides
      </h2>

      <div className="mt-4 space-y-4">
        {grupos.map((grupo) => (
          <div key={grupo.nivel}>
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {grupo.nivel}
            </span>

            <div className="mt-2 divide-y divide-border/50">
              {grupo.chefes.map((chefe) => (
                <div key={chefe.nome} className="flex items-center gap-3 py-2">
                  <div className="flex shrink-0 -space-x-1">
                    {chefe.tipos.map((tipo) => (
                      <TypeIcon
                        key={tipo}
                        tipo={tipo}
                        compact
                        className="bg-secondary ring-2 ring-card"
                      />
                    ))}
                  </div>
                  <span className="font-medium">{chefe.nome}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
