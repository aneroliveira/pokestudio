import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/february-communityday2027
 * (horário), confirmado 10/11/2026 — só data e horário.
 */
export const communityDayFevereiro: Evento = {
  slug: "community-day-fevereiro",
  titulo: "Community Day de fevereiro",
  periodo: {
    inicio: "2027-02-06T14:00:00-03:00",
    fim: "2027-02-06T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 06/02, das 14h às 17h (horário local)",
  tema: "comunidade",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o Pokémon em destaque, o golpe exclusivo e os bônus ainda não saíram. Cai três semanas antes do GO Tour: Alola Global (27–28/02).",
  },
};
