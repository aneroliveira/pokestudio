import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-charizard-x-mega-charizard-y-in-mega-raids-october-2026
 * e leekduck.com/events/palkia-in-5-star-raid-battles-october-2026
 * (confirmado 12/10/2026) — 21/10 6h → 27/10, Hora de Reide do Palkia em
 * 21/10 18h–19h. O Leek Duck diz 22h no fim; mantenho 21h seguindo a
 * correção dos cards anteriores. A página não diz a forma do Palkia —
 * assumo a forma normal (não Origem). Palkia não está no roster de Megas —
 * usa sprite curado manualmente.
 */
export const megaCharizard: Evento = {
  slug: "mega-charizard",
  titulo: "Mega Charizard X e Y + Palkia",
  periodo: {
    inicio: "2026-10-21T06:00:00-03:00",
    fim: "2026-10-27T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 21/10 às 6h até Terça, 27/10 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Palkia, 21/10 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (21/10 → 27/10)",
      chefes: [
        { nome: "Mega Charizard X", tipos: ["Fire", "Dragon"] },
        { nome: "Mega Charizard Y", tipos: ["Fire", "Flying"] },
      ],
    },
    {
      nivel: "Reides de 5 estrelas — Palkia (21/10 → 27/10)",
      chefes: [
        {
          nome: "Palkia",
          tipos: ["Water", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm484.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Fogo e Dragão já estão \"prontos\" no plano — as duas Megas de Charizard servem mais como apoio (X pra Dragão, Y pra Fogo) do que como reforço. Palkia (Origem 2691) já está na reserva de Dragão; a forma normal entra mais pelo shiny.",
    linkPlano: true,
  },
};
