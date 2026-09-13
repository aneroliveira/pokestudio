import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Só data e
 * horário de início vieram confirmados — City Safari costuma ter
 * ingresso/região específica e encontros exclusivos, mas nada disso veio
 * no calendário-fonte. Horário de encerramento (20h do dia 27) é uma
 * suposição baseada no padrão comum desse tipo de evento, não confirmada.
 */
export const citySafari: Evento = {
  slug: "city-safari",
  titulo: "Pokémon GO City Safari",
  periodo: {
    inicio: "2026-09-26T10:00:00-03:00",
    fim: "2026-09-27T20:00:00-03:00",
  },
  periodoTexto: "26/09 (sáb) 10h → 27/09 (dom) 20h de 2026 (horário local)",
  tema: "comunidade",
  notaCuradoria: {
    texto:
      "Ainda não tenho a cidade/região do Safari nem a lista de encontros exclusivos — normalmente esse tipo de evento pede ingresso e é local, então talvez nem se aplique. Atualizo assim que confirmar.",
  },
};
