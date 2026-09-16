import type { Evento } from "@/models/evento";
import { megaBeedrill } from "./mega-beedrill";
import { zacianVeterano } from "./zacian-veterano";
import { megaHoundoom } from "./mega-houndoom";
import { megaVenusaur } from "./mega-venusaur";
import { pokemonHorizontes } from "./pokemon-horizontes";
import { zamazentaVeterano } from "./zamazenta-veterano";
import { reidesSombrosasThundurus } from "./reides-sombrosas-thundurus";
import { rotacaoLendariaMax } from "./rotacao-lendaria-max";
import { escolhaSeuCaminho } from "./escolha-seu-caminho";
import { megaMalamar } from "./mega-malamar";
import { citySafari } from "./city-safari";
import { mestreDaCaptura } from "./mestre-da-captura";
import { festivalDaColheita } from "./festival-da-colheita";
import { megaVictreebel } from "./mega-victreebel";
import { invasaoRocketZekrom } from "./invasao-rocket-zekrom";

/** Registro de todos os eventos. Um evento novo só precisa entrar aqui. */
export const EVENTOS: Evento[] = [
  megaBeedrill,
  zacianVeterano,
  megaHoundoom,
  megaVenusaur,
  pokemonHorizontes,
  zamazentaVeterano,
  reidesSombrosasThundurus,
  rotacaoLendariaMax,
  escolhaSeuCaminho,
  megaMalamar,
  citySafari,
  mestreDaCaptura,
  festivalDaColheita,
  megaVictreebel,
  invasaoRocketZekrom,
];

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
