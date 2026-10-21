import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/minior-showers-orionids-2026 (confirmado
 * 12/10/2026, atualizado 21/10) e pokemongo.com/pt_BR/news/minior-meteor-showers-2026
 * (nome oficial "Oriônidas") — primeira de seis chuvas, cada uma estreando
 * uma cor de núcleo diferente. O Leek Duck diz que a desta é o Núcleo
 * Verde; o post oficial não associa cor a chuva. Shiny não anunciado.
 * Slug mantido com a grafia antiga pra não quebrar link.
 */
export const chuvaDeMiniorOrionideos: Evento = {
  slug: "chuva-de-minior-orionideos",
  titulo: "Chuva de Minior: Oriônidas",
  periodo: {
    inicio: "2026-10-19T17:00:00-03:00",
    fim: "2026-10-24T23:59:00-03:00",
  },
  periodoTexto: "Segunda, 19/10 às 17h até Sábado, 24/10 às 23h59 (horário local)",
  tema: "psiquico",
  badge: "Estreia do Minior",
  estreias: {
    lista: [
      {
        nome: "Minior",
        tipos: ["Rock", "Flying"],
        origem: "Estreia no jogo, na Forma Meteoro — selvagem, com mais chance das 17h às 21h.",
      },
    ],
    dica: "1.000 de Poeira Estelar por Minior capturado. Cor de núcleo que estreia nesta chuva: verde (segundo o Leek Duck).",
  },
  notaCuradoria: {
    texto:
      "Mecânica nova: o Minior começa a batalha na Forma Meteoro (mais Defesa) e, abaixo de 50% de HP, mostra o núcleo (mais Ataque) — por enquanto só contra a Equipe GO Rocket, líderes de equipe e na Liga de Batalhas GO. Próximas chuvas: Leônidas (14–19/11) e Gemínidas (11–16/12). Evento de coleção — nada essencial pro plano de reide.",
  },
};
