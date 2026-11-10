import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/max-battle-day-january-2027
 * (horário), confirmado 10/11/2026 — só data e horário.
 */
export const diaDeBatalhasMaxJaneiro: Evento = {
  slug: "dia-de-batalhas-max-janeiro",
  titulo: "Dia de Batalhas Max de janeiro",
  periodo: {
    inicio: "2027-01-23T14:00:00-03:00",
    fim: "2027-01-23T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 23/01, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o Pokémon em destaque, os bônus e o ingresso ainda não saíram.",
  },
};
