import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/dynamax-trails-eternamax-eternatus-2026
 * e leekduck.com/events/eternamax-eternatus-max-battles-2026 (atualizado
 * 03/11/2026). Nome oficial confirmado: "Trilhas Dinamax". As Batalhas Max
 * do evento são "todos os Dinamax que já apareceram, menos Lendários e
 * Míticos" — o post não lista chefes nem níveis, então ficam de fora. O
 * Eternatus Eternamax (21/11, 11h–14h) não pode ser capturado: só dá Doce
 * e Doce GG de Eternatus. Eternatus não está no roster de Megas — sprites
 * curados manualmente.
 */
export const trilhasDinamax: Evento = {
  slug: "trilhas-dinamax",
  titulo: "Trilhas Dinamax",
  periodo: {
    inicio: "2026-11-16T10:00:00-03:00",
    fim: "2026-11-23T20:00:00-03:00",
  },
  periodoTexto: "Segunda, 16/11 às 10h até Segunda, 23/11 às 20h (horário local)",
  tema: "lendario",
  badge: "Eternatus Eternamax volta em 21/11, das 11h às 14h",
  encontros: [
    {
      nome: "Grookey",
      tipos: ["Grass"],
      nota: "Hora do Pokémon em destaque: quinta, 19/11, 18h–19h, com 2× Doce em capturas.",
      shiny: true,
    },
    {
      nome: "Scorbunny",
      tipos: ["Fire"],
      nota: "Hora do Pokémon em destaque: quinta, 19/11, 18h–19h.",
      shiny: true,
    },
    {
      nome: "Sobble",
      tipos: ["Water"],
      nota: "Hora do Pokémon em destaque: quinta, 19/11, 18h–19h.",
      shiny: true,
    },
  ],
  reides: [
    {
      nivel: "Batalhas Max — Eternatus Eternamax (sábado, 21/11, 11h–14h)",
      chefes: [
        {
          nome: "Eternatus Eternamax",
          tipos: ["Poison", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm890.fETERNAMAX.icon.png",
        },
      ],
    },
    {
      nivel: "GO Pass: Trilhas Dinamax (grátis) — encontro com Eternatus",
      chefes: [
        {
          nome: "Eternatus",
          tipos: ["Poison", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm890.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Eternatus Eternamax toma a maioria dos Pontos de Energia em 21/11, das 11h às 14h. Ele não pode ser capturado, mas cada vitória dá muito Doce e Doce GG de Eternatus — pra fortalecer o Eternatus do GO Pass (quem já tem ganha 100 Doces no lugar do encontro). Nessa janela: Pontos de Energia renovam mais rápido, limite de Partículas Max sobe pra 2.400 e os Pontos dão 8× partículas. Reide Remota até 30 de 20/11 às 18h a 21/11 às 23h (Brasília). No resto da semana, Batalhas Max com todos os Dinamax que já apareceram (menos Lendários e Míticos), com chance de Fundo Especial. GO Pass grátis (Deluxe US$4,99; upgrade grátis pra quem resgatou o rank 1 da Natureza Selvagem): rank 15 dá 2× Poeira. No mesmo dia 21/11 tem o Community Day do Pawniard, a partir das 14h.",
    linkPlano: true,
  },
};
