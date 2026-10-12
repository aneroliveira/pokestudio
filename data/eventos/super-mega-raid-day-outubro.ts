import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/super-mega-raid-day-october-2026 e a página
 * "save the date" oficial (pokemongo.com/pt-BR/news/save-the-date-s24)
 * (confirmado 12/10/2026) — só data e horário anunciados; chefes, bônus e
 * ingresso ainda não. Atualizar quando sair o post oficial.
 */
export const superMegaRaidDayOutubro: Evento = {
  slug: "super-mega-raid-day-outubro",
  titulo: "Dia de Super Megarreides",
  periodo: {
    inicio: "2026-10-31T14:00:00-03:00",
    fim: "2026-10-31T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 31/10, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Chefes ainda não anunciados",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — os chefes, bônus e o ingresso ainda não saíram. Cai no meio do Halloween Parte I e da semana do Mega Sableye + Giratina Origem, então vale guardar Passes de Reide pros dois.",
  },
};
