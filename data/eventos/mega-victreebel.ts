import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-victreebel-in-mega-raids-september-2026
 * e leekduck.com/events/xerneas-in-5-star-raid-battles-september-2026
 * (confirmado 16/09/2026) — Mega Victreebel 30/09 6h → 06/10 21h (corrigido
 * de 22h a partir de um card de reide mais preciso); Xerneas é uma rotação
 * de reide de 5 estrelas de semana inteira (mesma janela), não só uma Hora
 * Lendária — tem Hora de Reide extra em 30/09 18h–19h. Xerneas não está no
 * roster de Megas — usa sprite curado manualmente.
 */
export const megaVictreebel: Evento = {
  slug: "mega-victreebel",
  titulo: "Mega Victreebel",
  periodo: {
    inicio: "2026-09-30T06:00:00-03:00",
    fim: "2026-10-06T21:00:00-03:00",
  },
  periodoTexto: "30/09 (qua) 6h → 06/10 (ter) 21h de 2026 (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Xerneas, 30/09 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (30/09 → 06/10)",
      chefes: [{ nome: "Mega Victreebel", tipos: ["Grass", "Poison"] }],
    },
    {
      nivel: "Reides Veteranos — Xerneas (30/09 → 06/10)",
      chefes: [
        {
          nome: "Xerneas",
          tipos: ["Fairy"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm716.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Planta segue \"baixa\" no plano — mais uma chance de reforçar depois do Mega Venusaur da semana passada. E Fada continua \"subnivelado\": depois do Zacian Veterano, Xerneas é outra chance boa de fechar essa lacuna, com a semana inteira pra tentar (não só uma hora).",
    linkPlano: true,
  },
};
