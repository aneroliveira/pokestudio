import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/november-communityday2026 (confirmado
 * 18/10/2026) — só data e horário. Pokémon, golpe exclusivo e bônus ainda
 * não anunciados. Atualizar quando sair o post oficial.
 */
export const communityDayNovembro: Evento = {
  slug: "community-day-novembro",
  titulo: "Community Day de novembro",
  periodo: {
    inicio: "2026-11-21T14:00:00-03:00",
    fim: "2026-11-21T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 21/11, das 14h às 17h (horário local)",
  tema: "comunidade",
  badge: "Pokémon ainda não anunciado",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — o Pokémon em destaque, o golpe exclusivo e os bônus ainda não saíram.",
  },
};
