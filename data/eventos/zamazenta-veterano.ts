import type { Evento } from "@/models/evento";

/**
 * Fonte: card de reide colado pela Lorena (PC de Captura, fraquezas,
 * contadores) — confirma 16/09 6h → 22/09 21h local (não 22h; corrigido a
 * partir da fonte anterior, o Leek Duck em inglês dizia 22h). CP de
 * captura (nível 20, 67–100% IV): 2100–2188 sem clima, 2625–2735 com
 * clima — uso o teto (100%) como CP curado. Zamazenta não está no roster
 * de Megas, então usa sprite curado manualmente.
 */
export const zamazentaVeterano: Evento = {
  slug: "zamazenta-veterano",
  titulo: "Zamazenta Veterano",
  periodo: {
    inicio: "2026-09-16T06:00:00-03:00",
    fim: "2026-09-22T21:00:00-03:00",
  },
  periodoTexto: "16/09 (qua) 6h → 22/09 (ter) 21h de 2026 (horário local)",
  tema: "lendario",
  badge: "Hora de Reide extra: 16/09 18h–19h",
  reides: [
    {
      nivel: "Reides Veteranos (16→22/09)",
      chefes: [
        {
          nome: "Zamazenta",
          tipos: ["Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm889.icon.png",
          cpSemClima: 2188,
          cpComClima: 2735,
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Lutador já está \"excelente\" no plano (Mewtwo X → Heracross → Terrakion) — Zamazenta é prioridade baixa, mais indicado pra quem ainda não tem nenhum exemplar do que pra reforçar a bolsa.",
    linkPlano: true,
  },
};
