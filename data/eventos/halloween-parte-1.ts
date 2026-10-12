import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/halloween-2026-part-1 (confirmado 12/10/2026).
 * As tarefas de Pesquisa de Campo e o resto das reides ainda não foram
 * anunciados — só as de 1 estrela. GO Pass: Halloween 2026 cobre as duas
 * partes (27/10 → 05/11).
 */
export const halloweenParte1: Evento = {
  slug: "halloween-parte-1",
  titulo: "Halloween 2026 — Parte I",
  periodo: {
    inicio: "2026-10-27T10:00:00-03:00",
    fim: "2026-11-01T10:00:00-03:00",
  },
  periodoTexto: "Terça, 27/10 às 10h até Domingo, 01/11 às 10h (horário local)",
  tema: "sombrio",
  badge: "Estreia de 3 Pokémon fantasiados, todos com shiny",
  estreias: {
    lista: [
      { nome: "Pikachu de chapéu e capinha", tipos: ["Electric"], origem: "Estreia fantasiada, já com shiny — reides de 1 estrela." },
      { nome: "Zubat de cartola", tipos: ["Poison", "Flying"], origem: "Estreia fantasiada, já com shiny — selvagem." },
      { nome: "Sinistea de laço", tipos: ["Ghost"], origem: "Estreia fantasiada, já com shiny — reides de 1 estrela." },
    ],
    dica: "Travessuras no mapa: tocar nelas pode dar encontro do evento ou Doces de Pikachu, Zubat, Sinistea e Doce Raro.",
  },
  encontros: [
    { nome: "Zubat de cartola", tipos: ["Poison", "Flying"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Duskull", tipos: ["Ghost"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Piplup fantasiado", tipos: ["Water"], nota: "Selvagem, fantasia de Travessura de Halloween, com shiny.", shiny: true },
    { nome: "Drifblim fantasiado", tipos: ["Ghost", "Flying"], nota: "Selvagem (raro), fantasia de Travessura de Halloween, com shiny.", shiny: true },
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
      "GO Pass: Halloween 2026 (grátis; Deluxe US$7,99): rank 10 dá 2× Doce em capturas (3× no Deluxe), rank 20 dá 2× Poeira Estelar (3× no Deluxe) — bom momento pra farmar Poeira. Resgatar recompensas até 07/11 às 20h. Evento de captura/coleção — o que importa pro plano de Fantasma nesta semana é a Giratina Origem nas reides de 5 estrelas (a partir de 28/10).",
  },
};
