import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-s25 (agenda oficial da
 * próxima temporada) e leekduck.com/events/december-communityday2026
 * (horário), confirmado 10/11/2026 — só data e horário. Dura dois dias,
 * como todo Community Day de dezembro — normalmente com os destaques do
 * ano.
 */
export const communityDayDezembro: Evento = {
  slug: "community-day-dezembro",
  titulo: "Community Day de dezembro",
  periodo: {
    inicio: "2026-12-12T14:00:00-03:00",
    fim: "2026-12-13T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 12/12 e Domingo, 13/12, das 14h às 17h (horário local)",
  tema: "comunidade",
  badge: "Dois dias · Pokémon ainda não anunciados",
  notaCuradoria: {
    texto:
      "Só as datas confirmadas até agora. O de dezembro costuma juntar vários Pokémon de Community Days do ano, com os golpes exclusivos de volta — vale guardar Doces e Poeira pra evoluir o que faltou.",
  },
};
