import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/into-the-wild-2026 e
 * pokemongo.com/pt_BR/news/into-the-wild-2026 (confirmado 18/10/2026) —
 * aquecimento da Área Selvagem GO 2026: Global. O evento vai até 13/11, mas
 * bônus, GO Pass e Caixa Misteriosa seguem até 15/11 às 18h. Nenhum chefe
 * está no roster de Megas — sprites curados manualmente (Orthworm não tem
 * ícone no CDN ainda). Completado em 03/11 com o guia do canal Pokémon Go
 * Brasil (WhatsApp), que bate com o Leek Duck: Batalhas Max de Ralts e
 * Machop, requisitos das formas Coroadas e o acesso antecipado ao GO Pass
 * das Trilhas Dinamax (confirmado no post oficial delas).
 */
export const naturezaSelvagem: Evento = {
  slug: "natureza-selvagem",
  titulo: "Natureza Selvagem",
  periodo: {
    inicio: "2026-11-09T10:00:00-03:00",
    fim: "2026-11-13T20:00:00-03:00",
  },
  periodoTexto: "Segunda, 09/11 às 10h até Sexta, 13/11 às 20h (horário local — bônus até 15/11 às 18h)",
  tema: "lendario",
  badge: "Aquecimento da Área Selvagem · Estreia: Regidrago Dinamax",
  estreias: {
    lista: [
      { nome: "Regidrago Dinamax", tipos: ["Dragon"], origem: "Estreia em Batalhas Max de 5 estrelas, com shiny — destaque em 12/11." },
      { nome: "Meltan Dinamax", tipos: ["Steel"], origem: "Estreia no GO Pass: Natureza Selvagem (grátis), com chance de shiny." },
    ],
    dica: "Golpes exclusivos se capturados no evento: Registeel com Garra de Metal, Regidrago com Sopro do Dragão, Latias com Bola de Névoa e Latios com Purga Brilhante.",
  },
  encontros: [
    { nome: "Magnemite", tipos: ["Electric", "Steel"], nota: "Selvagem, mais frequente, com shiny.", shiny: true },
    { nome: "Noibat", tipos: ["Flying", "Dragon"], nota: "Selvagem, mais frequente, com shiny.", shiny: true },
    { nome: "Togedemaru", tipos: ["Electric", "Steel"], nota: "Selvagem, mais frequente, com shiny.", shiny: true },
  ],
  reides: [
    {
      nivel: "3 estrelas",
      chefes: [
        {
          nome: "Druddigon",
          tipos: ["Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm621.icon.png",
        },
        { nome: "Orthworm", tipos: ["Steel"] },
      ],
    },
    {
      nivel: "5 estrelas — Horas de Reide 18h–19h: Zacian em 09/11, Zamazenta em 10/11",
      chefes: [
        {
          nome: "Zacian Espada Coroada",
          tipos: ["Fairy", "Steel"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm888.fCROWNED_SWORD.icon.png",
        },
        {
          nome: "Zamazenta Escudo Coroado",
          tipos: ["Fighting", "Steel"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm889.fCROWNED_SHIELD.icon.png",
        },
      ],
    },
    {
      nivel: "Batalhas Max de 5 estrelas — destaque 18h–19h no dia de cada um",
      chefes: [
        {
          nome: "Registeel Dinamax (11/11)",
          tipos: ["Steel"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm379.icon.png",
        },
        {
          nome: "Regidrago Dinamax (12/11)",
          tipos: ["Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm895.icon.png",
        },
        {
          nome: "Latias Dinamax (13/11)",
          tipos: ["Dragon", "Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm380.icon.png",
        },
        {
          nome: "Latios Dinamax (13/11)",
          tipos: ["Dragon", "Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm381.icon.png",
        },
      ],
    },
    {
      nivel: "Batalhas Max de 1 e 2 estrelas",
      chefes: [
        {
          nome: "Ralts Dinamax (1 estrela)",
          tipos: ["Psychic", "Fairy"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm280.icon.png",
        },
        {
          nome: "Machop Dinamax (2 estrelas)",
          tipos: ["Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm66.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: derrotar Zacian Espada Coroada dá Energia Espada Coroada — o Zacian 2628 da reserva tem 0/1.000 e é o que trava a Forma Coroada (Fada \"subnivelado\" no plano). Zamazenta Escudo Coroado dá a energia do escudo. A captura depois da reide é da forma Herói — pra virar Coroada precisa de 1.000 de energia + 30 Doces, e o golpe carregado vira Cabeça de Ferro. Machop Dinamax (2 estrelas) é o que vale farmar: Machamp Dinamax é a resposta pra Dialga e Duraludon nas Batalhas Max da Área Selvagem. Limite de Reide Remota 30 de 09/11 a 13/11 e ilimitado em 14–15/11. Moeda (Gimmighoul) e Caixa Misteriosa (Meltan) com chance de shiny, e a caixa reabre mais rápido. GO Pass Deluxe (US$14,99) traz Tampinha Prateada (não serve em Sombrosos), +5.000 XP em reides e Batalhas Max e +1 Doce/Doce XL. Resgatar o rank 1 deste GO Pass dá acesso antecipado (14/11, 10h) e upgrade grátis pro Deluxe do GO Pass: Trilhas Dinamax. Sem Descobertas Diárias de 09/11 a 15/11.",
    linkPlano: true,
  },
};
