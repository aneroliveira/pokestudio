import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/minior-meteor-showers-2026 (nome oficial
 * "Gemínidas") e leekduck.com/events/minior-showers-geminids-2026
 * (confirmado 21/10/2026) — terceira das seis chuvas, a única com duas
 * cores de núcleo estreando: uma no Hemisfério Norte e outra no Sul. As
 * cores ainda não foram anunciadas.
 */
export const chuvaDeMiniorGeminidas: Evento = {
  slug: "chuva-de-minior-geminidas",
  titulo: "Chuva de Minior: Gemínidas",
  periodo: {
    inicio: "2026-12-11T17:00:00-03:00",
    fim: "2026-12-16T23:59:00-03:00",
  },
  periodoTexto: "Sexta, 11/12 às 17h até Quarta, 16/12 às 23h59 (horário local)",
  tema: "psiquico",
  badge: "Cor de núcleo exclusiva do Hemisfério Sul",
  encontros: [
    {
      nome: "Minior",
      tipos: ["Rock", "Flying"],
      nota: "Selvagem, na Forma Meteoro — mais chance das 17h às 21h. Uma cor de núcleo estreia só no Hemisfério Sul (Brasil incluso), outra só no Norte.",
    },
  ],
  notaCuradoria: {
    texto:
      "1.000 de Poeira Estelar por Minior capturado. Única chuva com cor de núcleo regional — a do Sul é a que dá pra pegar no Brasil. Próximas chuvas, já em 2027: Eta Aquáridas (03–08/05), Delta Aquáridas do Sul (28/07–02/08) e Perseidas (10–15/08). Evento de coleção — nada essencial pro plano de reide.",
  },
};
