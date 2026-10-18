import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { SpriteEvento } from "@/components/eventos/SpriteEvento";
import { especiePorNome } from "@/services/eventos/especiePokemon";
import type { EstreiaEvento } from "@/models/evento";

type EventoEstreiasProps = {
  lista: EstreiaEvento[];
  dica?: string;
};

export function EventoEstreias({ lista, dica }: EventoEstreiasProps) {
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold">Estreias</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          <Sparkles className="h-3 w-3" />
          Novo
        </span>
      </div>

      <div className="mt-4 divide-y divide-border/50">
        {lista.map((estreia) => {
          const especie = especiePorNome(estreia.nome);

          return (
            <div key={estreia.nome} className="flex items-center gap-3 py-3 first:pt-0">
              {especie && <SpriteEvento especie={especie} />}
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-medium leading-tight">
                  {estreia.nome}
                  <span className="flex shrink-0 gap-0.5">
                    {estreia.tipos.map((tipo) => (
                      <TypeIcon key={tipo} tipo={tipo} mini className="bg-secondary" />
                    ))}
                  </span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {estreia.origem}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {dica && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-attention px-3 py-2.5 text-sm text-attention-foreground">
          <span aria-hidden>⚠️</span>
          <span>
            <strong>Dica:</strong> {dica}
          </span>
        </div>
      )}
    </Card>
  );
}
