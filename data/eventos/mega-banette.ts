import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-banette-in-mega-raids-november-2026 e
 * leekduck.com/events/cresselia-darkrai-in-5-star-raid-battles-november-2026
 * (confirmado 21/10/2026) — 16/11 6h → 24/11, Hora de Reide com Cresselia e
 * Darkrai em 18/11 18h–19h. O Leek Duck diz 22h no fim; mantenho 21h
 * seguindo a correção dos cards anteriores. Cresselia e Darkrai não estão
 * no roster de Megas — sprites curados manualmente.
 */
export const megaBanette: Evento = {
  slug: "mega-banette",
  titulo: "Mega Banette + Cresselia e Darkrai",
  periodo: {
    inicio: "2026-11-16T06:00:00-03:00",
    fim: "2026-11-24T21:00:00-03:00",
  },
  periodoTexto: "Segunda, 16/11 às 6h até Terça, 24/11 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Cresselia e Darkrai, 18/11 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (16/11 → 24/11)",
      chefes: [{ nome: "Mega Banette", tipos: ["Ghost"] }],
    },
    {
      nivel: "Reides de 5 estrelas (16/11 → 24/11)",
      chefes: [
        {
          nome: "Cresselia",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm488.icon.png",
        },
        {
          nome: "Darkrai",
          tipos: ["Dark"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm491.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Mega Banette é Fantasma puro — reforça o Fantasma \"subnivelado\" no plano (Lunala 2289 → Gengar 2049) como Mega de apoio. Darkrai é um bom atacante de Sombrio, mas Sombrio já está \"excelente\" (Hydreigon 3764); Cresselia é mais defensiva (Liga de Batalha). Todos com shiny.",
    linkPlano: true,
  },
};
