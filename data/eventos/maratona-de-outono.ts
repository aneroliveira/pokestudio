import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/fall-marathon-buddy-trek-2026 (confirmado
 * 12/10/2026) — nome oficial "Fall Marathon: Buddy Trek". Estreia do
 * Bramblin e nível Super Max do Mega Manectric (Descarga+: 150 de poder em
 * reide). O Leek Duck não diz se o Pikachu de viseira é shiny.
 */
export const maratonaDeOutono: Evento = {
  slug: "maratona-de-outono",
  titulo: "Maratona de Outono: Trilha com Parceiro",
  periodo: {
    inicio: "2026-10-13T10:00:00-03:00",
    fim: "2026-10-19T20:00:00-03:00",
  },
  periodoTexto: "Terça, 13/10 às 10h até Segunda, 19/10 às 20h (horário local)",
  tema: "comunidade",
  badge: "Mega Manectric chega ao nível Super Max",
  estreias: {
    lista: [
      {
        nome: "Bramblin",
        tipos: ["Grass", "Ghost"],
        origem: "Estreia no jogo — via Incenso, Pesquisa de Campo e tarefas do GO Pass.",
      },
    ],
    dica: "Pesquisa Cronometrada grátis: andar 5, 10, 21 e 42 km (16.800 XP no total) dá um encontro com Pikachu de viseira de maratona.",
  },
  encontros: [
    { nome: "Electrike", tipos: ["Electric"], nota: "Selvagem e no Incenso, chance de shiny aumentada.", shiny: true },
    { nome: "Ponyta", tipos: ["Fire"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Doduo", tipos: ["Normal", "Flying"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Blitzle", tipos: ["Electric"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Skarmory", tipos: ["Steel", "Flying"], nota: "Selvagem (mais raro), com shiny.", shiny: true },
    { nome: "Ponyta de Galar", tipos: ["Psychic"], nota: "Incenso, 13/10 10h → 16/10 10h.", shiny: true },
    { nome: "Hoppip", tipos: ["Grass", "Flying"], nota: "Incenso, 13/10 10h → 16/10 10h.", shiny: true },
    { nome: "Dwebble", tipos: ["Bug", "Rock"], nota: "Incenso, 13/10 10h → 16/10 10h.", shiny: true },
    {
      nome: "Growlithe de Hisui",
      tipos: ["Fire", "Rock"],
      nota: "Incenso, 16/10 10h → 19/10 20h, chance de shiny aumentada.",
      shiny: true,
    },
    { nome: "Nincada", tipos: ["Bug", "Ground"], nota: "Incenso, 16/10 10h → 19/10 20h.", shiny: true },
    { nome: "Helioptile", tipos: ["Electric", "Normal"], nota: "Incenso, 16/10 10h → 19/10 20h.", shiny: true },
  ],
  notaCuradoria: {
    texto:
      "Elétrico é o \"buraco\" do plano (Regieleki 1563) — Mega Manectric no nível Super Max, com Descarga+ (150 de poder em reide), é uma Mega de apoio útil pra cobrir essa lacuna. Pra chegar lá: levar o Manectric ao nível Mega 3 (Máx.) e depois gastar Energia Mega dele. Energia Mega vem de Pesquisa de Campo e, no rank 20 do GO Pass, 5× Energia andando com Electrike/Manectric de parceiro. Rank 10 do GO Pass: Incenso dura 2h. O Incenso Diário de Aventura não conta pros encontros do evento.",
    linkPlano: true,
  },
};
