import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação de
 * Reides Veteranos, início às 5h — sem checagem cruzada adicional
 * confirmada). Zacian não está no roster de Megas (data/megas.json), então
 * usa sprite curado manualmente (mesmo CDN de pokemon-go-api/assets usado
 * lá) — sem CP curado por falta de fonte confirmada.
 */
export const zacianVeterano: Evento = {
  slug: "zacian-veterano",
  titulo: "Zacian Veterano",
  periodo: {
    inicio: "2026-09-09T05:00:00-03:00",
    fim: "2026-09-15T05:00:00-03:00",
  },
  periodoTexto: "09/09 (qua) 5h → 15/09 (ter) 5h de 2026 (horário local)",
  tema: "lendario",
  reides: [
    {
      nivel: "Reides Veteranos (09→15/09)",
      chefes: [
        {
          nome: "Zacian",
          tipos: ["Fairy"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm888.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Fada está \"subnivelado\" no plano (titular Enamorus 2387 → Togekiss 2328 → Gardevoir 2298), com só um Zacian 2628 de reserva — essa rotação é a chance de reforçar o Fada da bolsa sem depender de um evento raro.",
    linkPlano: true,
  },
};
