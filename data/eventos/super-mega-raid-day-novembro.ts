import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/super-mega-raid-day-november-2026 (confirmado
 * 18/10/2026) — só data e horário anunciados; chefes, bônus e ingresso
 * ainda não. Atualizar quando sair o post oficial.
 */
export const superMegaRaidDayNovembro: Evento = {
  slug: "super-mega-raid-day-novembro",
  titulo: "Dia de Super Megarreides de novembro",
  periodo: {
    inicio: "2026-11-28T14:00:00-03:00",
    fim: "2026-11-28T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 28/11, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Chefes ainda não anunciados",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — os chefes, bônus e o ingresso ainda não saíram.",
  },
};
