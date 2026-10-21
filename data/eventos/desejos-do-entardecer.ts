import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/twilight-wishes-2026 (confirmado 21/10/2026) —
 * só data e horário. Nome em português ainda provisório ("Twilight
 * Wishes", seguindo a temporada Trilhas do Entardecer / Twilight Trails) —
 * trocar pelo oficial quando sair o post pt-BR. Conteúdo ainda não
 * anunciado.
 */
export const desejosDoEntardecer: Evento = {
  slug: "desejos-do-entardecer",
  titulo: "Desejos do Entardecer",
  periodo: {
    inicio: "2026-11-24T10:00:00-03:00",
    fim: "2026-11-30T20:00:00-03:00",
  },
  periodoTexto: "Terça, 24/11 às 10h até Segunda, 30/11 às 20h (horário local)",
  tema: "psiquico",
  badge: "Detalhes ainda não anunciados",
  notaCuradoria: {
    texto:
      "Só data e horário confirmados até agora. Último evento da temporada Trilhas do Entardecer (que termina em 01/12) e cai junto do Dia de Super Megarreides de 28/11 e da semana do Mega Metagross + Deoxys (25/11 → 01/12).",
  },
};
