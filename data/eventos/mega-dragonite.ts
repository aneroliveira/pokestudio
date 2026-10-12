import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-dragonite-in-mega-raids-october-2026 e
 * leekduck.com/events/dialga-in-5-star-raid-battles-october-2026
 * (confirmado 12/10/2026) — 14/10 6h → 20/10, Hora de Reide do Dialga em
 * 14/10 18h–19h. O Leek Duck diz 22h no fim; mantenho 21h seguindo a
 * correção dos cards anteriores. A página não diz a forma do Dialga — o
 * título é só "Dialga", então assumo a forma normal (não Origem). Dialga
 * não está no roster de Megas — usa sprite curado manualmente.
 */
export const megaDragonite: Evento = {
  slug: "mega-dragonite",
  titulo: "Mega Dragonite + Dialga",
  periodo: {
    inicio: "2026-10-14T06:00:00-03:00",
    fim: "2026-10-20T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 14/10 às 6h até Terça, 20/10 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Dialga, 14/10 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (14/10 → 20/10)",
      chefes: [{ nome: "Mega Dragonite", tipos: ["Dragon", "Flying"] }],
    },
    {
      nivel: "Reides de 5 estrelas — Dialga (14/10 → 20/10)",
      chefes: [
        {
          nome: "Dialga",
          tipos: ["Steel", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm483.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Dragão já está \"pronto\" no plano (Salamence 3671), então Mega Dragonite é mais Mega de apoio pras reides de Dragão. Aço está só \"ok\" (Metagross 3390, com Dialga 2283 na reserva) — um Dialga melhor pode subir pro time de Aço. Dica: a mesma semana tem a Maratona de Outono, com Mega Manectric ganhando nível Super Max.",
    linkPlano: true,
  },
};
