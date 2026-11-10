import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/max-battle-day-december-2026
 * (horário), confirmado 10/11/2026 — só data e horário. Pokémon ainda não
 * anunciado.
 */
export const diaDeBatalhasMaxDezembro: Evento = {
  slug: "dia-de-batalhas-max-dezembro",
  titulo: "Dia de Batalhas Max de dezembro",
  periodo: {
    inicio: "2026-12-05T14:00:00-03:00",
    fim: "2026-12-05T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 05/12, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o Pokémon em destaque, os bônus e o ingresso ainda não saíram.",
  },
};
