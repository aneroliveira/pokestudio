import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/raid-day-february-2027
 * (horário), confirmado 10/11/2026 — só data e horário.
 */
export const diaDeReidesFevereiro: Evento = {
  slug: "dia-de-reides-fevereiro",
  titulo: "Dia de Reides de fevereiro",
  periodo: {
    inicio: "2027-02-13T14:00:00-03:00",
    fim: "2027-02-13T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 13/02, das 14h às 17h (horário local)",
  tema: "lendario",
  badge: "Chefe ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o chefe, os bônus e o ingresso ainda não saíram.",
  },
};
