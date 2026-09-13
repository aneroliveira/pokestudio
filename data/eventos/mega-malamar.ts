import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação semanal
 * de Mega Raids, início às 5h).
 */
export const megaMalamar: Evento = {
  slug: "mega-malamar",
  titulo: "Mega Malamar",
  periodo: {
    inicio: "2026-09-23T05:00:00-03:00",
    fim: "2026-09-29T05:00:00-03:00",
  },
  periodoTexto: "23/09 (qua) 5h → 29/09 (ter) 5h de 2026 (horário local)",
  tema: "mega",
  reides: [
    {
      nivel: "Mega Raids (23→29/09)",
      chefes: [{ nome: "Mega Malamar", tipos: ["Dark", "Psychic"] }],
    },
  ],
  notaCuradoria: {
    texto:
      "Sombrio e Psíquico já estão \"excelente\" no plano (Hydreigon 3764 e Mewtwo X/Y) — Mega Malamar é o mais redundante da leva de Megas do mês. Prioridade baixa, só por Energia Mega se sobrar tempo.",
    linkPlano: true,
  },
};
