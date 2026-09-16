import type { Evento } from "@/models/evento";

/**
 * Fonte: infográfico oficial colado pela Lorena (Pokémon GO, PT-BR,
 * "Celebração da série Pokémon: Horizontes") + leekduck.com/events/
 * pokemon-horizons-the-series-celebration-event-2026, confirmado
 * 16/09/2026. Substitui a versão anterior, que tinha alguns encontros
 * (Sprigatito/Fuecoco/Quaxly/Nacli/Tinkatink) que não aparecem no
 * infográfico oficial — provavelmente conflito com a Twilight Trails
 * Season (que roda por baixo, o mês inteiro) e não é exclusivo desse
 * evento.
 */
export const pokemonHorizontes: Evento = {
  slug: "pokemon-horizontes",
  titulo: "Pokémon Horizontes: Celebração da Série",
  periodo: {
    inicio: "2026-09-16T10:00:00-03:00",
    fim: "2026-09-22T20:00:00-03:00",
  },
  periodoTexto: "16/09 (qua) 10h → 22/09 (ter) 20h de 2026 (horário local)",
  tema: "comunidade",
  badge: "Estreia: Charmander de óculos de aviador do Friede",
  estreias: {
    lista: [
      {
        nome: "Charmander de óculos de aviador do Friede",
        tipos: ["Fire"],
        origem:
          "Celebração de Pokémon Horizontes — evolui pra Charmeleon (25 doces) e Charizard (100 doces) mantendo a fantasia.",
      },
    ],
    dica: "Hora do Holofote específica no dia 17/09, 18h–19h, com chance maior de encontrar o Charmander fantasiado na natureza.",
  },
  encontros: [
    { nome: "Pikachu", tipos: ["Electric"], nota: "Selvagem, o dia inteiro." },
    { nome: "Fidough", tipos: ["Fairy"], nota: "Selvagem, dia (5h–17h)." },
    { nome: "Wattrel", tipos: ["Electric", "Flying"], nota: "Selvagem, dia (5h–17h)." },
    { nome: "Chansey", tipos: ["Normal"], nota: "Selvagem, dia (5h–17h)." },
    { nome: "Eevee", tipos: ["Normal"], nota: "Selvagem, noite (17h–5h)." },
    { nome: "Hatenna", tipos: ["Psychic"], nota: "Selvagem, noite (17h–5h)." },
    { nome: "Rockruff", tipos: ["Rock"], nota: "Selvagem, noite (17h–5h)." },
  ],
  reides: [
    {
      nivel: "1 estrela",
      chefes: [{ nome: "Pikachu de boné do Capitão", tipos: ["Electric"] }],
    },
    {
      nivel: "3 estrelas",
      chefes: [
        { nome: "Charizard de óculos de aviador do Friede", tipos: ["Fire", "Flying"] },
        { nome: "Meowscarada", tipos: ["Grass", "Dark"] },
        { nome: "Skeledirge", tipos: ["Fire", "Ghost"] },
        { nome: "Quaquaval", tipos: ["Water", "Fighting"] },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Evento de coleção/fantasia, não de reide sério pro plano — mais sobre Pokédex e shiny do que reforçar atacante.",
      "",
      "Bônus gerais: mais chance de achar Kecleon em PokéStops, Vitrines de Poképarada em cada dia do evento, e fotos de Instantâneo podem render encontros surpresa com personagens da série animada.",
      "",
      "GO Pass grátis: Ranque 1 dá 2× doces por captura, Ranque 10 dá Módulo Atrair de 1h, Ranque 20 dá poeira extra pegando Hatenna e Wattrel. Versão Deluxe (R$9,90): mais Pokémon temáticos, Passe de Reide, Doce Raro GG, e 3× doces por captura já no Ranque 1.",
    ].join("\n"),
  },
};
