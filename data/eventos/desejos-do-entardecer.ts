import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/twilight-wishes-2026 (atualizado
 * 03/11/2026). Nome oficial: "Chamados do Crepúsculo" — o "Desejos do
 * Entardecer" de antes era tradução provisória minha. Slug mantido pra não
 * quebrar link. Os Pikachu, Espeon e Umbreon fantasiados usam o sprite da
 * forma normal; as Megas vêm do roster.
 */
export const desejosDoEntardecer: Evento = {
  slug: "desejos-do-entardecer",
  titulo: "Chamados do Crepúsculo",
  periodo: {
    inicio: "2026-11-24T10:00:00-03:00",
    fim: "2026-11-30T20:00:00-03:00",
  },
  periodoTexto: "Terça, 24/11 às 10h até Segunda, 30/11 às 20h (horário local)",
  tema: "psiquico",
  badge: "Mais chance de Staryu e Elgyem brilhantes",
  encontros: [
    { nome: "Clefairy", tipos: ["Fairy"], nota: "Selvagem, com shiny.", shiny: true },
    { nome: "Staryu", tipos: ["Water"], nota: "Selvagem, chance de shiny aumentada.", shiny: true },
    { nome: "Elgyem", tipos: ["Psychic"], nota: "Selvagem, chance de shiny aumentada.", shiny: true },
    { nome: "Rockruff", tipos: ["Rock"], nota: "Selvagem, com shiny.", shiny: true },
  ],
  reides: [
    {
      nivel: "1 estrela",
      chefes: [
        {
          nome: "Pikachu com coroa de sol",
          tipos: ["Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm25.icon.png",
        },
        {
          nome: "Pikachu com coroa de lua",
          tipos: ["Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm25.icon.png",
        },
      ],
    },
    {
      nivel: "3 estrelas",
      chefes: [
        {
          nome: "Espeon com lenço de sol",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm196.icon.png",
        },
        {
          nome: "Umbreon com lenço de lua",
          tipos: ["Dark"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm197.icon.png",
        },
      ],
    },
    {
      nivel: "Megarreides",
      chefes: [
        { nome: "Mega Beedrill", tipos: ["Bug", "Poison"] },
        { nome: "Mega Houndoom", tipos: ["Dark", "Fire"] },
        { nome: "Mega Sableye", tipos: ["Dark", "Ghost"] },
        { nome: "Mega Manectric", tipos: ["Electric"] },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Pesquisa de Campo dá Megaenergia e encontros: de 24/11 10h a 26/11 10h, Applin (shiny) e Maschiff; de 26/11 10h a 30/11 20h, Gengar do Festival Arrepiante (shiny), Drifblim de Travessura (shiny) e Bramblin. Mega Sableye volta nas Megarreides — chance de juntar mais energia pro Super Max dele (Fantasma \"subnivelado\" no plano). GO Pass grátis (Deluxe US$4,99; +6 ranques US$6,99): rank 1 dá mais chance de Pokémon e Amizade sortudos em trocas, rank 10 dá 2× Poeira (3× no Deluxe). Resgatar recompensas até 02/12 às 20h. Cai junto do Mega Metagross + Deoxys (25/11 → 01/12) e do Super Megarreides do Mega Clefable em 28/11.",
    linkPlano: true,
  },
};
