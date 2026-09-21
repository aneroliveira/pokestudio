"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { EventosCalendario } from "@/components/eventos/EventosCalendario";
import type { Evento } from "@/models/evento";
import type { EstadoEvento } from "@/data/eventos";
import { ROTULO_ESTADO, ESTILO_ESTADO } from "@/constants/estadoEvento";

type EventosViewProps = {
  eventos: { evento: Evento; estado: EstadoEvento }[];
  hojeISO: string;
};

const ABAS = ["Lista", "Calendário"] as const;
type Aba = (typeof ABAS)[number];

export function EventosView({ eventos, hojeISO }: EventosViewProps) {
  const [aba, setAba] = useState<Aba>("Lista");

  if (eventos.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted-foreground">
          Nenhum evento cadastrado no momento.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs abas={ABAS} ativa={aba} onChange={setAba} />

      {aba === "Lista" ? (
        <div className="space-y-3">
          {eventos.map(({ evento, estado }) => (
            <Link key={evento.slug} href={`/eventos/${evento.slug}`}>
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
          ))}
        </div>
      ) : (
        <Card>
          <EventosCalendario eventos={eventos} hojeISO={hojeISO} />
        </Card>
      )}
    </div>
  );
}
