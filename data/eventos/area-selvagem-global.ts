import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/pokemon-go-wild-area-2026-global (confirmado
 * 18/10/2026). Evento global com ingresso (R$22,90 / US$11,99), que cobre
 * os dois dias. Tarefas de Pesquisa de Campo e taxa exata de shiny ainda
 * não foram anunciadas. Nenhum chefe está no roster de Megas — sprites
 * curados manualmente (sem ícone Gigantamax do Duraludon no CDN, usa o base).
 */
export const areaSelvagemGlobal: Evento = {
  slug: "area-selvagem-global",
  titulo: "Área Selvagem GO 2026: Global",
  periodo: {
    inicio: "2026-11-14T10:00:00-03:00",
    fim: "2026-11-15T18:00:00-03:00",
  },
  periodoTexto: "Sábado, 14/11 e Domingo, 15/11, das 10h às 18h (horário local)",
  tema: "lendario",
  badge: "Ingresso R$22,90 · Estreia: Duraludon Gigantamax",
  estreias: {
    lista: [
      { nome: "Duraludon Gigantamax", tipos: ["Steel", "Dragon"], origem: "Estreia em Batalhas Max de 6 estrelas nos dois dias, com shiny." },
      { nome: "Dialga Dinamax", tipos: ["Steel", "Dragon"], origem: "Estreia em Batalhas Max no sábado, 14/11, com shiny." },
      { nome: "Palkia Dinamax", tipos: ["Water", "Dragon"], origem: "Estreia em Batalhas Max no domingo, 15/11, com shiny." },
      { nome: "Machamp de jaqueta moderna", tipos: ["Fighting"], origem: "Estreia fantasiada nas reides de 3 estrelas, com shiny — vem com Golpe de Caratê." },
    ],
    dica: "Com ingresso: Latias e Latios poderosos atraídos por Incenso (não vale o Incenso Diário), mais chance de shiny e Pesquisa Especial com caminho Aço ou Dragão, que termina num Duraludon Gigantamax com fundo especial.",
  },
  encontros: [
    { nome: "Beldum", tipos: ["Steel", "Psychic"], nota: "Horas \"Firmes como Aço\" (10h, 12h, 14h e 16h), com Skarmory, Aron, Lucario, Tinkatink e outros Aço.", shiny: true },
    { nome: "Gible", tipos: ["Dragon", "Ground"], nota: "Horas \"Ousados como Dragões\" (11h, 13h, 15h e 17h), com Dratini, Bagon, Deino, Goomy, Jangmo-o, Frigibax e outros Dragão.", shiny: true },
    { nome: "Metagross poderoso", tipos: ["Steel", "Psychic"], nota: "Pokémon poderoso de sábado (mais chance de IV alto e XL/XXL). Evoluído no evento aprende Soco Meteoro." },
    { nome: "Hydreigon poderoso", tipos: ["Dark", "Dragon"], nota: "Pokémon poderoso de domingo. Evoluído no evento aprende Balanço Brutal." },
  ],
  reides: [
    {
      nivel: "3 estrelas",
      chefes: [
        {
          nome: "Machamp de jaqueta moderna",
          tipos: ["Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm68.icon.png",
        },
      ],
    },
    {
      nivel: "5 estrelas — Sábado, 14/11",
      chefes: [
        {
          nome: "Zekrom",
          tipos: ["Dragon", "Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm644.icon.png",
        },
        {
          nome: "Kyurem Branco",
          tipos: ["Dragon", "Ice"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm646.fWHITE.icon.png",
        },
      ],
    },
    {
      nivel: "5 estrelas — Domingo, 15/11",
      chefes: [
        {
          nome: "Reshiram",
          tipos: ["Dragon", "Fire"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm643.icon.png",
        },
        {
          nome: "Kyurem Negro",
          tipos: ["Dragon", "Ice"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm646.fBLACK.icon.png",
        },
      ],
    },
    {
      nivel: "Batalhas Max — 6 estrelas nos dois dias + lendário Dinamax do dia",
      chefes: [
        {
          nome: "Duraludon Gigantamax",
          tipos: ["Steel", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm884.icon.png",
        },
        {
          nome: "Dialga Dinamax (14/11)",
          tipos: ["Steel", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm483.icon.png",
        },
        {
          nome: "Palkia Dinamax (15/11)",
          tipos: ["Water", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm484.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade máxima pro Kyurem: Zekrom (sábado) dá Energia Voltaica e Reshiram (domingo) dá Incandescente — o Black está em 505/1.000 e o White em 355/1.000. As reides de Kyurem Branco/Negro também dão Energia de Fusão, e Kyurem de reide pode vir com Glaciar, o que economiza a MT Elite reservada pra isso. Grátis pra todos (10h–18h): até 3 Passes de Reide por dia, Safári Bolas, limite de Partículas Max 1.600 e Jogo em Grupo de 8h. Com ingresso: até 6 passes por dia, 2× Doce, Incenso em dobro, partículas até 3.200, mais Ovos de 10 km e até 6 Trocas Especiais com metade da Poeira. Reide Remota sem limite nos dois dias (vem da Natureza Selvagem).",
    linkPlano: true,
  },
};
