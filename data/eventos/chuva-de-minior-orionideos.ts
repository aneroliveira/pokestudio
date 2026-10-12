import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/minior-showers-orionids-2026 (confirmado
 * 12/10/2026) — primeira de seis "Minior Showers", cada uma estreando uma
 * cor de núcleo diferente. As cores das Orionídeas e o shiny não foram
 * anunciados ainda.
 */
export const chuvaDeMiniorOrionideos: Evento = {
  slug: "chuva-de-minior-orionideos",
  titulo: "Chuva de Minior: Orionídeas",
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
    dica: "Mais Poeira Estelar ao capturar Minior. As cores de núcleo desta chuva ainda não foram anunciadas.",
  },
  notaCuradoria: {
    texto:
      "Mecânica nova: o Minior começa a batalha na Forma Meteoro (mais Defesa) e, abaixo de 50% de HP, mostra o núcleo (mais Ataque) — por enquanto só contra a Equipe GO Rocket, líderes de equipe e na Liga de Batalhas GO. Próximas chuvas: Leonídeas (14–19/11) e Geminídeas (11–16/12). Evento de coleção — nada essencial pro plano de reide.",
  },
};
