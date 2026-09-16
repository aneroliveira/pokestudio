import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/harvest-festival-2026 e
 * pokemongo.com/en/news/harvest-festival-2026 (confirmado 16/09/2026) —
 * nome oficial "Harvest Festival: Applin Picking". Estreia de Applin
 * shiny no jogo.
 */
export const festivalDaColheita: Evento = {
  slug: "festival-da-colheita",
  titulo: "Festival da Colheita: Colheita de Applin",
  periodo: {
    inicio: "2026-09-29T10:00:00-03:00",
    fim: "2026-10-05T20:00:00-03:00",
  },
  periodoTexto: "29/09 (ter) 10h → 05/10 (seg) 20h de 2026 (horário local)",
  tema: "comunidade",
  badge: "Estreia: Applin brilhante",
  estreias: {
    lista: [
      { nome: "Applin", tipos: ["Grass", "Dragon"], origem: "Estreia shiny — primeira vez disponível no jogo." },
    ],
    dica: "Smoliv também com chance de shiny bem maior que o normal durante o evento.",
  },
  encontros: [
    { nome: "Skwovet", tipos: ["Normal"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Lechonk", tipos: ["Normal"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Smoliv", tipos: ["Grass", "Normal"], nota: "Selvagem, chance de shiny bem maior que o normal.", shiny: true },
    {
      nome: "Cottonee",
      tipos: ["Grass", "Fairy"],
      nota: "Versão de coroa de flores, só via as maçãs dos Módulos Chamariz Musgosos.",
    },
  ],
  notaCuradoria: {
    texto:
      "Mecânica nova: Módulo Chamariz Musgoso (dura 1h no evento) atrai só maçãs — tocar nelas dá Maçã Azeda, Maçã Doce, Maçã em Calda, ou um encontro com Cottonee de coroa de flores ou Applin. GO Pass: Festival da Colheita começa junto (grátis, com Deluxe por US$4,99 dando mais recompensa). Nada essencial pro plano de reide — é evento de captura/coleção.",
  },
};
