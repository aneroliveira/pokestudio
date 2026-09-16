"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { listarEventos } from "@/data/eventos";
import { COR_PONTO_ESTADO } from "@/constants/estadoEvento";

type EventoNavRapidaProps = {
  slugAtual: string;
};

/** Tira horizontal (arrasta/rola) com todos os eventos, pra pular de um
 *  evento pro outro sem precisar voltar pra listagem. O evento atual fica
 *  destacado; o pontinho colorido mostra o estado (ativo/em-breve/
 *  encerrado) de cada um. Ao navegar, a tira já chega rolada até o pill
 *  atual — sem isso, cada clique reabria a lista lá do início e era
 *  preciso rolar de novo pra achar onde se estava. */
export function EventoNavRapida({ slugAtual }: EventoNavRapidaProps) {
  const eventos = listarEventos(new Date());
  const ativoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    ativoRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [slugAtual]);

  if (eventos.length < 2) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {eventos.map(({ evento, estado }) => {
        const atual = evento.slug === slugAtual;

        return (
          <Link
            key={evento.slug}
            ref={atual ? ativoRef : undefined}
            href={`/eventos/${evento.slug}`}
            aria-current={atual || undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              atual
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${COR_PONTO_ESTADO[estado]}`}
            />
            {evento.titulo}
          </Link>
        );
      })}
    </div>
  );
}
