import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/january-communitydayclassic2027
 * (horário), confirmado 10/11/2026 — só data e horário.
 */
export const communityDayClassicoJaneiro: Evento = {
  slug: "community-day-classico-janeiro",
  titulo: "Community Day Clássico de janeiro",
  periodo: {
    inicio: "2027-01-02T14:00:00-03:00",
    fim: "2027-01-02T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 02/01, das 14h às 17h (horário local)",
  tema: "comunidade",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora. O Clássico traz de volta o Pokémon de um Community Day antigo, com o golpe exclusivo — vale ver qual é assim que sair.",
  },
};
