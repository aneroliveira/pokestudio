import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação semanal
 * de Mega Raids, início às 5h — sem checagem cruzada adicional confirmada).
 * Horário de término assumido como o início da próxima rotação (mesmo
 * padrão observado nas outras janelas do mês).
 */
export const megaBeedrill: Evento = {
  slug: "mega-beedrill",
  titulo: "Mega Beedrill",
  periodo: {
    inicio: "2026-09-08T05:00:00-03:00",
    fim: "2026-09-15T05:00:00-03:00",
  },
  periodoTexto: "08/09 (ter) 5h → 15/09 (ter) 5h de 2026 (horário local)",
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
