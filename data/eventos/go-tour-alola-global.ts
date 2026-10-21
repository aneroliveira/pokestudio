import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/save-the-date-go-tour-2027 ("Marquem as
 * datas: Pokémon GO Tour 2027", confirmado 21/10/2026) — só as datas. O
 * evento global é 27–28/02/2027; os presenciais (Kaohsiung e Los Angeles,
 * 19–21/02) ficam de fora do calendário. Horário ainda não anunciado —
 * `periodo` cobre os dois dias inteiros só pra calcular o estado.
 * Ingressos saem na próxima temporada.
 */
export const goTourAlolaGlobal: Evento = {
  slug: "go-tour-alola-global",
  titulo: "Pokémon GO Tour: Alola — Global",
  periodo: {
    inicio: "2027-02-27T00:00:00-03:00",
    fim: "2027-02-28T23:59:00-03:00",
  },
  periodoTexto: "Sábado, 27/02 e Domingo, 28/02/2027 (horário ainda não anunciado)",
  tema: "lendario",
  badge: "Região de Alola · ingressos na próxima temporada",
  notaCuradoria: {
    texto:
      "Só as datas confirmadas até agora. Celebra Alola (Sol e Lua) — os ingressos do evento global e dos presenciais (Kaohsiung e Los Angeles, 19–21/02) saem na próxima temporada, junto com os detalhes.",
  },
};
