import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e
 * leekduck.com/events/super-mega-raid-day-january-2027 (horário),
 * confirmado 10/11/2026 — só data e horário.
 */
export const superMegaRaidDayJaneiro: Evento = {
  slug: "super-mega-raid-day-janeiro",
  titulo: "Dia de Super Megarreides (09/01)",
  periodo: {
    inicio: "2027-01-09T14:00:00-03:00",
    fim: "2027-01-09T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 09/01, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Chefe ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o chefe, os bônus e o ingresso ainda não saíram. Janeiro tem dois Dias de Super Megarreides (09/01 e 30/01).",
  },
};
