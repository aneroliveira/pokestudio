import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/halloween-2026-part-2 (confirmado 12/10/2026).
 * Estreia do Greavard shiny e nível Super Max do Mega Sableye (Sombra
 * Noturna+: 160 de poder em reide). O Leek Duck não deixa claro se o Gengar
 * fantasiado tem shiny, então fica sem a marcação.
 */
export const halloweenParte2: Evento = {
  slug: "halloween-parte-2",
  titulo: "Halloween 2026 — Parte II",
  periodo: {
    inicio: "2026-11-01T10:00:00-03:00",
    fim: "2026-11-05T20:00:00-03:00",
  },
  periodoTexto: "Domingo, 01/11 às 10h até Quinta, 05/11 às 20h (horário local)",
  tema: "sombrio",
  badge: "Estreia: Greavard brilhante",
  estreias: {
    lista: [
      { nome: "Greavard", tipos: ["Ghost"], origem: "Estreia shiny — selvagem, Pesquisa de Campo e tarefas do GO Pass." },
    ],
    dica: "Mega Sableye chega ao nível Super Max pela primeira vez, com Sombra Noturna+.",
  },
  encontros: [
    { nome: "Litwick", tipos: ["Ghost", "Fire"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Rowlet fantasiado", tipos: ["Grass", "Flying"], nota: "Selvagem, fantasia de Halloween, com shiny.", shiny: true },
    { nome: "Greavard", tipos: ["Ghost"], nota: "Selvagem, estreia shiny.", shiny: true },
    { nome: "Gengar fantasiado", tipos: ["Ghost", "Poison"], nota: "Selvagem (raro), fantasia de Festival Assustador." },
  ],
  reides: [
    {
      nivel: "1 estrela",
      chefes: [
        {
          nome: "Pikachu de chapéu e capinha",
          tipos: ["Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm25.icon.png",
        },
        {
          nome: "Sinistea de laço",
          tipos: ["Ghost"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm854.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Mega Sableye Super Max: levar o Sableye ao nível Mega 3 (Máx.) e depois gastar Energia Mega dele — dá pra juntar energia nas Mega Raids dele (28/10 → 03/11). Sombra Noturna+ (160 de poder em reide) faz dele uma Mega de apoio boa pra Fantasma, tipo \"subnivelado\" no plano. Os bônus do GO Pass: Halloween 2026 continuam valendo (2× Doce no rank 10, 2× Poeira no rank 20).",
    linkPlano: true,
  },
};
