import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Só data e
 * horário de início vieram confirmados — sem lista de estreias, encontros
 * temáticos ou bônus. Horário de encerramento (20h do dia 05/10) é uma
 * suposição baseada no padrão comum de eventos sazonais de uma semana, não
 * confirmada.
 */
export const festivalDaColheita: Evento = {
  slug: "festival-da-colheita",
  titulo: "Festival da Colheita",
  periodo: {
    inicio: "2026-09-29T10:00:00-03:00",
    fim: "2026-10-05T20:00:00-03:00",
  },
  periodoTexto: "29/09 (ter) 10h → 05/10 (seg) 20h de 2026 (horário local)",
  tema: "comunidade",
  notaCuradoria: {
    texto:
      "Ainda não tenho a lista de Pokémon temáticos, encontros ou bônus desse festival. Atualizo assim que confirmar os detalhes.",
  },
};
