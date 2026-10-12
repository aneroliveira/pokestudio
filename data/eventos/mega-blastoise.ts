import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-blastoise-in-mega-raids-october-2026 e
 * leekduck.com/events/yveltal-in-5-star-raid-battles-october-2026
 * (confirmado 12/10/2026) — mesma janela de semana inteira, 07/10 6h →
 * 13/10. O Leek Duck diz 22h no fim; mantenho 21h seguindo a correção dos
 * cards de reide das rotações anteriores (ver mega-victreebel.ts). Yveltal
 * não está no roster de Megas — usa sprite curado manualmente.
 */
export const megaBlastoise: Evento = {
  slug: "mega-blastoise",
  titulo: "Mega Blastoise + Yveltal",
  periodo: {
    inicio: "2026-10-07T06:00:00-03:00",
    fim: "2026-10-13T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 07/10 às 6h até Terça, 13/10 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Yveltal, 07/10 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (07/10 → 13/10)",
      chefes: [{ nome: "Mega Blastoise", tipos: ["Water"] }],
    },
    {
      nivel: "Reides de 5 estrelas — Yveltal (07/10 → 13/10)",
      chefes: [
        {
          nome: "Yveltal",
          tipos: ["Dark", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm717.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Água está \"ok\" no plano (Gyarados 3246 → Kyogre 2798) — Mega Blastoise ajuda mais como Mega de apoio do que como reforço de bolsa. Sombrio já está \"excelente\" (Hydreigon 3764) e Yveltal 2094 já está na reserva — vale mais pelo shiny. Últimos dias: termina terça, 13/10.",
    linkPlano: true,
  },
};
