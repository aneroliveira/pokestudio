import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. O calendário só
 * registra "pesquisa temporária, 3 caminhos" — sem lista de tarefas,
 * recompensas ou qual caminho é exclusivo do quê. Fica marcado como
 * "a confirmar" até esses detalhes aparecerem.
 */
export const escolhaSeuCaminho: Evento = {
  slug: "escolha-seu-caminho",
  titulo: "Escolha Seu Caminho",
  periodo: {
    inicio: "2026-09-23T10:00:00-03:00",
    fim: "2026-09-28T10:00:00-03:00",
  },
  periodoTexto: "23/09 (qua) 10h → 28/09 (seg) 10h de 2026 (horário local)",
  tema: "comunidade",
  notaCuradoria: {
    texto:
      "Pesquisa temporária com 3 caminhos — ainda não tenho a lista de tarefas nem as recompensas de cada caminho. Atualizo assim que confirmar os detalhes.",
  },
};
