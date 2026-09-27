import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/en/news/harvest-festival-2026 (evento oficial
 * "Harvest Festival: Taken Over" — a Equipe Rocket toma conta do Festival
 * da Colheita nesses dias), confirmado 16/09/2026. Horário de término
 * corrigido pra 20h (antes eu tinha meia-noite). Zekrom Sombroso não está
 * no roster de Megas — usa sprite curado manualmente, sem CP por falta de
 * fonte confirmada.
 *
 * O Gigantamax Cinderace Max Battle Day (03/10, 14h–17h) que caía dentro
 * dessa janela virou evento próprio (é uma página/marca oficial separada,
 * com bônus específicos de Batalhas Max, não do Festival da Colheita) —
 * ver `gigantamax-cinderace-max-battle-day.ts`.
 */
export const invasaoRocketZekrom: Evento = {
  slug: "invasao-rocket-zekrom",
  titulo: "Festival da Colheita: Rocket Assume o Controle",
  periodo: {
    inicio: "2026-10-02T00:00:00-03:00",
    fim: "2026-10-05T20:00:00-03:00",
  },
  periodoTexto: "Sexta, 02/10 a 00h até Segunda, 05/10 às 20h (horário local)",
  tema: "sombrio",
  badge: "Giovanni com Zekrom Sombroso",
  reides: [
    {
      nivel: "Invasão da Equipe Rocket — Giovanni (02→05/10)",
      chefes: [
        {
          nome: "Zekrom Sombroso",
          tipos: ["Dragon", "Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm644.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Provavelmente o melhor pickup do mês inteiro: Elétrico está em \"buraco\" e Dragão já está \"pronto\" (Salamence 3671) — um Zekrom Sombroso (+20% de ataque) ataca os dois de uma vez, com prioridade máxima pro furo elétrico. O Super Radar de Reide Rocket pra achar o Giovanni vem pelo GO Pass: Festival da Colheita — vale reservar uma Investida Furtiva ou Passe Premium especificamente pra essa semana.",
    linkPlano: true,
  },
};
