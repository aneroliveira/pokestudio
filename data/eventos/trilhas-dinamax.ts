import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/dynamax-trails-2026 (confirmado 21/10/2026) —
 * só data e horário. Nome em português ainda provisório ("Dynamax Trails";
 * o blog oficial pt-BR não publicou o post) — trocar pelo oficial quando
 * sair. Conteúdo (Batalhas Max, estreias, bônus) ainda não anunciado.
 */
export const trilhasDinamax: Evento = {
  slug: "trilhas-dinamax",
  titulo: "Trilhas Dinamax",
  periodo: {
    inicio: "2026-11-16T10:00:00-03:00",
    fim: "2026-11-23T20:00:00-03:00",
  },
  periodoTexto: "Segunda, 16/11 às 10h até Segunda, 23/11 às 20h (horário local)",
  tema: "lendario",
  badge: "Detalhes ainda não anunciados",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora — pelo nome, deve ter Batalhas Max em destaque. Cai junto da semana do Mega Banette + Cresselia e Darkrai (16/11 → 24/11) e do Community Day (21/11).",
  },
};
