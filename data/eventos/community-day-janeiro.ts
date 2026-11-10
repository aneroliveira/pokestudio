import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/january-communityday2027
 * (horário), confirmado 10/11/2026 — só data e horário.
 */
export const communityDayJaneiro: Evento = {
  slug: "community-day-janeiro",
  titulo: "Community Day de janeiro",
  periodo: {
    inicio: "2027-01-16T14:00:00-03:00",
    fim: "2027-01-16T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 16/01, das 14h às 17h (horário local)",
  tema: "comunidade",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o Pokémon em destaque, o golpe exclusivo e os bônus ainda não saíram.",
  },
};
