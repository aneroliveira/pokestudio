import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação semanal
 * de Mega Raids, início às 5h, junto com a Hora Lendária do Xerneas no
 * dia 30/09 — horário 18h–19h assumido pelo padrão das outras Horas
 * Lendárias do mês, não confirmado explicitamente no calendário-fonte).
 * Xerneas não está no roster de Megas — card renderiza com ícone de tipo.
 */
export const megaVictreebel: Evento = {
  slug: "mega-victreebel",
  titulo: "Mega Victreebel",
  periodo: {
    inicio: "2026-09-30T05:00:00-03:00",
    fim: "2026-10-06T05:00:00-03:00",
  },
  periodoTexto: "30/09 (qua) 5h → 06/10 (ter) 5h de 2026 (horário local)",
  tema: "mega",
  badge: "Hora Lendária: Xerneas, 30/09 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (30/09 → 06/10)",
      chefes: [{ nome: "Mega Victreebel", tipos: ["Grass", "Poison"] }],
    },
    {
      nivel: "Hora Lendária — Xerneas (30/09, 18h–19h)",
      chefes: [{ nome: "Xerneas", tipos: ["Fairy"] }],
    },
  ],
  notaCuradoria: {
    texto:
      "Planta segue \"baixa\" no plano — mais uma chance de reforçar depois do Mega Venusaur da semana passada. E Fada continua \"subnivelado\": depois do Zacian Veterano, Xerneas é outra chance boa de fechar essa lacuna na mesma semana.",
    linkPlano: true,
  },
};
