import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-venusaur-in-mega-raids-september-2026
 * e pokemongo.com/en/news/staraptor-super-mega-raid-day-2026 (confirmado
 * 16/09/2026) — 16/09 6h → 22/09 21h local (horário de término corrigido
 * de 22h pra 21h a partir de um card de reide mais preciso).
 *
 * Sobre Mega Staraptor: CONFIRMADO OFICIAL — é estreia mundial mesmo (não
 * existia em nenhum jogo antes, e eu tinha marcado errado como "não existe"
 * numa versão anterior deste arquivo; a Lorena mandou a fonte certa e a
 * Niantic confirmou a estreia pro dia 19/09, 14h–17h). Ainda assim não há
 * sprite oficial da forma Mega no CDN usado no site (pokemon-go-api/assets
 * — testado, 404), então continua com o ícone do Staraptor base como
 * aproximação, sem CP curado. Tipo (Normal/Flying) segue o Staraptor
 * normal — a página oficial não confirmou o tipo da Mega explicitamente.
 * O tie-in "Pokémon Horizontes" saiu como evento próprio, cheio de
 * conteúdo confirmado — ver data/eventos/pokemon-horizontes.ts.
 */
export const megaVenusaur: Evento = {
  slug: "mega-venusaur",
  titulo: "Mega Venusaur",
  periodo: {
    inicio: "2026-09-16T06:00:00-03:00",
    fim: "2026-09-22T21:00:00-03:00",
  },
  periodoTexto: "16/09 (qua) 6h → 22/09 (ter) 21h de 2026 (horário local)",
  tema: "mega",
  badge: "19/09: estreia mundial de Mega Staraptor",
  reides: [
    {
      nivel: "Mega Raids (16→22/09)",
      chefes: [{ nome: "Mega Venusaur", tipos: ["Grass", "Poison"] }],
    },
    {
      nivel: "Super Mega Reides — estreia (19/09, 14h–17h)",
      chefes: [
        {
          nome: "Mega Staraptor",
          tipos: ["Normal", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm398.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Planta está \"baixa\" no plano (titular Chesnaught 2533 → Venusaur 2720) — Mega Venusaur é prioridade real da semana, não só mais uma Mega Energia.",
      "",
      "O dia 19 é a estreia mundial de Mega Staraptor (14h–17h) — Voador também está \"baixa\" no plano (titular Braviary 1732, só uma reserva). Bônus do dia: chance de shiny (1 em 10), até 5 passes de reide grátis, limite de reide remoto sobe pra 20, e a Pesquisa Cronometrada dá um encontro de Gardevoir. Staraptor capturado já sai com Nível Mega 1 liberado, e dá pra subir até o \"Nível Super Máximo\" (destrava o golpe carregado Ave Brava+).",
    ].join("\n"),
    linkPlano: true,
  },
};
