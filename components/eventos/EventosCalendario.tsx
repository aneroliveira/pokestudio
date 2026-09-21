"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Evento } from "@/models/evento";
import type { EstadoEvento } from "@/data/eventos";
import { ROTULO_ESTADO, ESTILO_ESTADO, COR_PONTO_ESTADO } from "@/constants/estadoEvento";

type EventosCalendarioProps = {
  eventos: { evento: Evento; estado: EstadoEvento }[];
  /** ISO da data usada como "hoje" — vem do servidor (mesmo instante usado
   *  pra calcular o estado de cada evento) pra não abrir o calendário num
   *  mês diferente do que a listagem em lista considera "agora". */
  hojeISO: string;
};

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** Só a parte de data do ISO (ex.: "2026-08-18T10:00:00-03:00" → "2026-08-18"),
 *  sem passar por `Date` — os períodos dos eventos já vêm com offset
 *  explícito (-03:00), e converter via `new Date(iso).getDate()` usaria o
 *  fuso do navegador de quem visita, deslocando o dia pra quem não está no
 *  Brasil. */
function diaISO(iso: string): string {
  return iso.slice(0, 10);
}

/** Dia (YYYY-MM-DD) de um instante absoluto, no fuso de Brasília — ao
 *  contrário de `diaISO`, aqui a string de entrada NÃO carrega offset (é
 *  `agora.toISOString()`, em UTC), então fatiar os 10 primeiros caracteres
 *  dá o dia errado justamente das 21h às 23h59 (horário de Brasília), quando
 *  o UTC já virou o dia seguinte. Precisa converter de verdade pro fuso que
 *  os eventos usam ("horário local" = America/Sao_Paulo), não o fuso de
 *  quem está visitando. */
function diaLocalBrasilia(isoUTC: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(isoUTC));
}

function paraDataUTC(diaKey: string): Date {
  return new Date(`${diaKey}T00:00:00Z`);
}

function paraDiaKey(data: Date): string {
  return data.toISOString().slice(0, 10);
}

function somarDias(diaKey: string, quantidade: number): string {
  const data = paraDataUTC(diaKey);
  data.setUTCDate(data.getUTCDate() + quantidade);
  return paraDiaKey(data);
}

type EventoDoDia = { evento: Evento; estado: EstadoEvento };

/** Mapa dia → eventos que tocam aquele dia, expandindo cada evento por
 *  todo o intervalo entre `periodo.inicio` e `periodo.fim` (um evento de
 *  vários dias aparece em todos eles, não só no primeiro). */
function agruparPorDia(
  eventos: EventosCalendarioProps["eventos"],
): Map<string, EventoDoDia[]> {
  const mapa = new Map<string, EventoDoDia[]>();

  for (const item of eventos) {
    const inicio = diaISO(item.evento.periodo.inicio);
    const fim = diaISO(item.evento.periodo.fim);

    let cursor = inicio;
    // Guarda de segurança: evita loop infinito se algum evento tiver
    // `fim` antes de `inicio` por erro de cadastro.
    let voltas = 0;
    while (cursor <= fim && voltas < 366) {
      const lista = mapa.get(cursor) ?? [];
      lista.push(item);
      mapa.set(cursor, lista);
      cursor = somarDias(cursor, 1);
      voltas += 1;
    }
  }

  return mapa;
}

function tituloMes(ano: number, mes: number): string {
  const data = new Date(Date.UTC(ano, mes, 1));
  const texto = data.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  // Só a primeira letra — `capitalize` do Tailwind maiusculiza "de" também.
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Uma semana do grid: 7 dias corridos a partir de `inicioKey`. */
function gerarSemana(inicioKey: string): string[] {
  return Array.from({ length: 7 }, (_, i) => somarDias(inicioKey, i));
}

export function EventosCalendario({ eventos, hojeISO }: EventosCalendarioProps) {
  const hojeKey = diaLocalBrasilia(hojeISO);
  const hoje = paraDataUTC(hojeKey);

  // Sem navegação entre meses — só o mês vigente é exibido (RFC "e
  // apresente apenas o calendário do mês vigente"). O grid de 6 semanas
  // ainda cobre os dias de fechamento do mês anterior/seguinte (ver
  // `noMesAtual` abaixo), então um evento que começa nos primeiros dias do
  // próximo mês continua aparecendo, só não dá pra "virar a página" pra
  // navegar livremente por ele.
  const ano = hoje.getUTCFullYear();
  const mes = hoje.getUTCMonth();

  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

  const eventosPorDia = useMemo(() => agruparPorDia(eventos), [eventos]);

  const semanas = useMemo(() => {
    const primeiroDoMes = new Date(Date.UTC(ano, mes, 1));
    const inicioGrid = somarDias(
      paraDiaKey(primeiroDoMes),
      -primeiroDoMes.getUTCDay(),
    );

    const linhas: string[][] = [];
    let cursor = inicioGrid;
    for (let semana = 0; semana < 6; semana += 1) {
      linhas.push(gerarSemana(cursor));
      cursor = somarDias(cursor, 7);
    }
    return linhas;
  }, [ano, mes]);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{tituloMes(ano, mes)}</h3>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {DIAS_SEMANA.map((dia, indice) => {
          const fimDeSemana = indice === 0 || indice === 6;
          return (
            <div key={dia} className={fimDeSemana ? "text-primary/80" : undefined}>
              {dia}
            </div>
          );
        })}
      </div>

      <div className="space-y-1">
        {semanas.map((semana) => {
          const diaExpandidoNaSemana = semana.includes(diaSelecionado ?? "")
            ? diaSelecionado
            : null;
          const eventosDoDiaExpandido = diaExpandidoNaSemana
            ? eventosPorDia.get(diaExpandidoNaSemana) ?? []
            : [];

          return (
            <div key={semana[0]}>
              <div className="grid grid-cols-7 gap-1">
                {semana.map((diaKey) => {
                  const data = paraDataUTC(diaKey);
                  const noMesAtual = data.getUTCMonth() === mes;
                  const eEhHoje = diaKey === hojeKey;
                  const eventosDoDia = eventosPorDia.get(diaKey) ?? [];
                  const temEventos = eventosDoDia.length > 0;
                  const selecionado = diaKey === diaSelecionado;
                  const diaDaSemana = data.getUTCDay();
                  const fimDeSemana = diaDaSemana === 0 || diaDaSemana === 6;

                  return (
                    <button
                      key={diaKey}
                      type="button"
                      disabled={!temEventos}
                      aria-pressed={selecionado}
                      onClick={() =>
                        setDiaSelecionado((atual) => (atual === diaKey ? null : diaKey))
                      }
                      className={cn(
                        "flex min-h-[40px] flex-col items-start gap-1 rounded-xl border p-1 text-left transition sm:min-h-[64px] sm:p-1.5",
                        noMesAtual ? "border-border/60" : "border-border/30",
                        fimDeSemana && !selecionado && "bg-primary/[0.03]",
                        temEventos && "hover:border-primary/40",
                        selecionado && "border-primary bg-primary/5",
                        !temEventos && "cursor-default",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs",
                          !noMesAtual && "text-muted-foreground/50",
                          noMesAtual && !eEhHoje && fimDeSemana && "text-primary/80",
                          noMesAtual && !eEhHoje && !fimDeSemana && "text-foreground/80",
                          eEhHoje && "bg-primary text-primary-foreground font-semibold",
                        )}
                      >
                        {data.getUTCDate()}
                      </span>

                      {/* Mobile: só pontinhos (sem espaço pra título legível
                          nesta largura de coluna) — o toque no dia já abre
                          a lista completa embaixo da semana. */}
                      {temEventos && (
                        <div className="flex flex-wrap gap-0.5 sm:hidden">
                          {eventosDoDia.slice(0, 4).map(({ evento, estado }) => (
                            <span
                              key={evento.slug}
                              aria-hidden
                              className={cn("h-1.5 w-1.5 shrink-0 rounded-full", COR_PONTO_ESTADO[estado])}
                            />
                          ))}
                        </div>
                      )}

                      <div className="hidden w-full flex-col gap-0.5 sm:flex">
                        {eventosDoDia.slice(0, 2).map(({ evento, estado }) => (
                          <span
                            key={evento.slug}
                            className="flex items-center gap-1 truncate text-[10px] leading-tight text-foreground/80"
                          >
                            <span
                              aria-hidden
                              className={cn("h-1.5 w-1.5 shrink-0 rounded-full", COR_PONTO_ESTADO[estado])}
                            />
                            <span className="truncate">{evento.titulo}</span>
                          </span>
                        ))}
                        {eventosDoDia.length > 2 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{eventosDoDia.length - 2} mais
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {diaExpandidoNaSemana && eventosDoDiaExpandido.length > 0 && (
                <div className="mt-1 space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-3">
                  {eventosDoDiaExpandido.map(({ evento, estado }) => (
                    <Link
                      key={evento.slug}
                      href={`/eventos/${evento.slug}`}
                      className="block rounded-lg p-2 transition hover:bg-background/60"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold">{evento.titulo}</h4>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[estado]}`}
                        >
                          {ROTULO_ESTADO[estado]}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {evento.periodoTexto}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
