import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/zacian-hero-of-many-battles-in-5-star-raid-battles-september-2026,
 * horário de término corrigido pra 21h (mesmo ajuste do Zamazenta,
 * confirmado por um card de reide mais preciso) — 09/09 6h → 15/09 21h
 * local, com Hora de Reide extra em 09/09 18h–19h. Zacian não está no
 * roster de Megas (data/megas.json), então usa sprite curado manualmente
 * (mesmo CDN de pokemon-go-api/assets usado lá) — sem CP curado por falta
 * de fonte confirmada.
 */
export const zacianVeterano: Evento = {
  slug: "zacian-veterano",
  titulo: "Zacian Veterano",
  periodo: {
    inicio: "2026-09-09T06:00:00-03:00",
    fim: "2026-09-15T21:00:00-03:00",
  },
  periodoTexto: "09/09 (qua) 6h → 15/09 (ter) 21h de 2026 (horário local)",
  tema: "lendario",
  badge: "Hora de Reide extra: 09/09 18h–19h",
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
