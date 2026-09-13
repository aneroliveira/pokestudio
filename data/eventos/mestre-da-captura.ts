import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Só o nome e o
 * horário do evento vieram confirmados — sem lista de bônus, desafios de
 * captura ou encontros especiais. Fica "a confirmar" até completar.
 */
export const mestreDaCaptura: Evento = {
  slug: "mestre-da-captura",
  titulo: "Mestre da Captura",
  periodo: {
    inicio: "2026-09-26T10:00:00-03:00",
    fim: "2026-09-26T17:00:00-03:00",
  },
  periodoTexto: "26/09 (sáb) 10h → 17h de 2026 (horário local)",
  tema: "comunidade",
  notaCuradoria: {
    texto:
      "Evento de captura de um dia só — ainda não tenho a lista de bônus/desafios específicos. Atualizo assim que confirmar os detalhes.",
  },
};
