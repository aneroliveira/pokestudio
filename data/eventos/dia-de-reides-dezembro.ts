import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/raid-day-december-2026
 * (horário), confirmado 10/11/2026 — só data e horário. Chefe ainda não
 * anunciado.
 */
export const diaDeReidesDezembro: Evento = {
  slug: "dia-de-reides-dezembro",
  titulo: "Dia de Reides de dezembro",
  periodo: {
    inicio: "2026-12-19T14:00:00-03:00",
    fim: "2026-12-19T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 19/12, das 14h às 17h (horário local)",
  tema: "lendario",
  badge: "Chefe ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o chefe, os bônus e o ingresso ainda não saíram.",
  },
};
