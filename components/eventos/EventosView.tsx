"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { EventosCalendario } from "@/components/eventos/EventosCalendario";
import type { Evento } from "@/models/evento";
import type { EstadoEvento } from "@/data/eventos";
import { ROTULO_ESTADO, ESTILO_ESTADO } from "@/constants/estadoEvento";

type ItemEvento = { evento: Evento; estado: EstadoEvento };

function CardEvento({ evento, estado }: ItemEvento) {
  return (
    <Link href={`/eventos/${evento.slug}`}>
      <Card className="flex items-center justify-between gap-4 hover:border-primary/40">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{evento.titulo}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[estado]}`}
            >
              {ROTULO_ESTADO[estado]}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {evento.periodoTexto}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Card>
    </Link>
  );
}

type EventosViewProps = {
  eventos: { evento: Evento; estado: EstadoEvento }[];
  hojeISO: string;
};

const ABAS = ["Calendário", "Lista"] as const;
type Aba = (typeof ABAS)[number];

export function EventosView({ eventos, hojeISO }: EventosViewProps) {
  const [aba, setAba] = useState<Aba>("Calendário");
  const [encerradosAbertos, setEncerradosAbertos] = useState(false);

  if (eventos.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted-foreground">
          Nenhum evento cadastrado no momento.
        </p>
      </Card>
    );
  }

  const emCartaz = eventos.filter((item) => item.estado !== "encerrado");
  const encerrados = eventos.filter((item) => item.estado === "encerrado");

  return (
    <div className="space-y-4">
      <Tabs abas={ABAS} ativa={aba} onChange={setAba} />

      {aba === "Lista" ? (
        <div className="space-y-3">
          {emCartaz.map((item) => (
            <CardEvento key={item.evento.slug} {...item} />
          ))}

          {encerrados.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setEncerradosAbertos((v) => !v)}
                aria-expanded={encerradosAbertos}
                className="flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${encerradosAbertos ? "rotate-180" : ""}`}
                />
                {encerradosAbertos ? "Ocultar" : "Ver"} encerrados ({encerrados.length})
              </button>

              {encerradosAbertos && (
                <div className="mt-3 space-y-3">
                  {encerrados.map((item) => (
                    <CardEvento key={item.evento.slug} {...item} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Card>
          <EventosCalendario eventos={eventos} hojeISO={hojeISO} />
        </Card>
      )}
    </div>
  );
}
