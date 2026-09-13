import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação de
 * Reides Veteranos, início às 5h). Sem sprite/CP curados: Zamazenta não
 * está no roster de Megas, então o card renderiza com os ícones de tipo.
 */
export const zamazentaVeterano: Evento = {
  slug: "zamazenta-veterano",
  titulo: "Zamazenta Veterano",
  periodo: {
    inicio: "2026-09-16T05:00:00-03:00",
    fim: "2026-09-22T05:00:00-03:00",
  },
  periodoTexto: "16/09 (qua) 5h → 22/09 (ter) 5h de 2026 (horário local)",
  tema: "lendario",
  reides: [
    {
      nivel: "Reides Veteranos (16→22/09)",
      chefes: [{ nome: "Zamazenta", tipos: ["Fighting"] }],
    },
  ],
  notaCuradoria: {
    texto:
      "Lutador já está \"excelente\" no plano (Mewtwo X → Heracross → Terrakion) — Zamazenta é prioridade baixa, mais indicado pra quem ainda não tem nenhum exemplar do que pra reforçar a bolsa.",
    linkPlano: true,
  },
};
