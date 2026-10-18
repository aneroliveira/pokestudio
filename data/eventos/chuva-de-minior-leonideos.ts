import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/minior-showers-leonids-2026 (confirmado
 * 18/10/2026) — segunda das seis "Minior Showers". Cor de núcleo e shiny
 * ainda não anunciados.
 */
export const chuvaDeMiniorLeonideos: Evento = {
  slug: "chuva-de-minior-leonideos",
  titulo: "Chuva de Minior: Leonídeas",
  periodo: {
    inicio: "2026-11-14T17:00:00-03:00",
    fim: "2026-11-19T23:59:00-03:00",
  },
  periodoTexto: "Sábado, 14/11 às 17h até Quinta, 19/11 às 23h59 (horário local)",
  tema: "psiquico",
  badge: "Nova cor de núcleo do Minior",
  encontros: [
    {
      nome: "Minior",
      tipos: ["Rock", "Flying"],
      nota: "Selvagem, na Forma Meteoro — mais chance das 17h às 21h. A cor de núcleo desta chuva ainda não foi anunciada.",
    },
  ],
  notaCuradoria: {
    texto:
      "Mais Poeira Estelar ao capturar Minior. Começa no fim do primeiro dia da Área Selvagem Global (14/11). Próxima chuva: Geminídeas (11–16/12). Evento de coleção — nada essencial pro plano de reide.",
  },
};
