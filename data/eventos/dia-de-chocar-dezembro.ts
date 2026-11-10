import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/hatch-day-december-2026
 * (horário), confirmado 10/11/2026 — só data e horário. Pokémon ainda não
 * anunciado.
 */
export const diaDeChocarDezembro: Evento = {
  slug: "dia-de-chocar-dezembro",
  titulo: "Dia de Chocar de dezembro",
  periodo: {
    inicio: "2026-12-26T11:00:00-03:00",
    fim: "2026-12-26T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 26/12, das 11h às 17h (horário local)",
  tema: "comunidade",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora. Pelo formato dos anteriores, vale deixar incubadoras e Ovos de 2 km guardados pro dia.",
  },
};
