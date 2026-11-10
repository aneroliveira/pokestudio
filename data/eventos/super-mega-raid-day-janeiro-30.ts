import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e
 * leekduck.com/events/super-mega-raid-day-january-30-2027 (horário),
 * confirmado 10/11/2026 — só data e horário.
 */
export const superMegaRaidDayJaneiro30: Evento = {
  slug: "super-mega-raid-day-janeiro-30",
  titulo: "Dia de Super Megarreides (30/01)",
  periodo: {
    inicio: "2027-01-30T14:00:00-03:00",
    fim: "2027-01-30T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 30/01, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Chefe ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o chefe, os bônus e o ingresso ainda não saíram. É o segundo Dia de Super Megarreides de janeiro (o outro é 09/01).",
  },
};
