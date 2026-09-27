import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-malamar-in-mega-raids-september-2026,
 * horário de término corrigido pra 21h (confirmado por um card de reide
 * mais preciso) — 23/09 6h → 29/09 21h local.
 */
export const megaMalamar: Evento = {
  slug: "mega-malamar",
  titulo: "Mega Malamar",
  periodo: {
    inicio: "2026-09-23T06:00:00-03:00",
    fim: "2026-09-29T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 23/09 às 6h até Terça, 29/09 às 21h (horário local)",
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
