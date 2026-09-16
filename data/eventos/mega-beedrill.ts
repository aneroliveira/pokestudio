import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-beedrill-in-mega-raids-september-2026,
 * horário de término corrigido pra 21h a partir de um card de reide mais
 * preciso que a Lorena conferiu (o Leek Duck em inglês dizia 22h) — 08/09
 * 6h → 15/09 21h local.
 */
export const megaBeedrill: Evento = {
  slug: "mega-beedrill",
  titulo: "Mega Beedrill",
  periodo: {
    inicio: "2026-09-08T06:00:00-03:00",
    fim: "2026-09-15T21:00:00-03:00",
  },
  periodoTexto: "08/09 (ter) 6h → 15/09 (ter) 21h de 2026 (horário local)",
  tema: "mega",
  reides: [
    {
      nivel: "Mega Raids (08→15/09)",
      chefes: [{ nome: "Mega Beedrill", tipos: ["Bug", "Poison"] }],
    },
  ],
  notaCuradoria: {
    texto:
      "Inseto está \"baixa\" no plano (titular Heracross 2364 → Scizor 2145, sem reserva forte) — Mega Beedrill vira um bom atacante de Inseto depois de megaevoluído, então vale acumular Energia Mega nessa janela mesmo sem pressa.",
    linkPlano: true,
  },
};
