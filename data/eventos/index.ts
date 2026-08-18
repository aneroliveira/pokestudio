import type { Evento } from "@/models/evento";
import { festivalAquatico } from "./festival-aquatico";
import { goFest2026MegaFinale } from "./gofest-2026-mega-finale";

/** Registro de todos os eventos. Um evento novo só precisa entrar aqui. */
export const EVENTOS: Evento[] = [festivalAquatico, goFest2026MegaFinale];

export function buscarEvento(slug: string): Evento | undefined {
  return EVENTOS.find((evento) => evento.slug === slug);
}

export type EstadoEvento = "ativo" | "em-breve" | "encerrado";

export function estadoEvento(evento: Evento, agora: Date): EstadoEvento {
  const inicio = new Date(evento.periodo.inicio);
  const fim = new Date(evento.periodo.fim);

  if (agora < inicio) return "em-breve";
  if (agora > fim) return "encerrado";
  return "ativo";
}

const ORDEM_ESTADO: Record<EstadoEvento, number> = {
  ativo: 0,
  "em-breve": 1,
  encerrado: 2,
};

/** Eventos ordenados por relevância: ativos primeiro, depois futuros,
 *  depois encerrados — e por `periodo.inicio` dentro de cada grupo. */
export function listarEventos(
  agora: Date,
): { evento: Evento; estado: EstadoEvento }[] {
  return EVENTOS.map((evento) => ({ evento, estado: estadoEvento(evento, agora) })).sort(
    (a, b) => {
      const porEstado = ORDEM_ESTADO[a.estado] - ORDEM_ESTADO[b.estado];
      if (porEstado !== 0) return porEstado;

      return (
        new Date(a.evento.periodo.inicio).getTime() -
        new Date(b.evento.periodo.inicio).getTime()
      );
    },
  );
}
