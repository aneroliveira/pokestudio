import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-metagross-in-mega-raids-november-2026 e
 * leekduck.com/events/deoxys-normal-defense-attack-speed-formes-in-5-star-raid-battles-november-2026
 * (confirmado 21/10/2026) — 25/11 6h → 01/12, Hora de Reide com as quatro
 * formas do Deoxys em 25/11 18h–19h. O Leek Duck diz 22h no fim; mantenho
 * 21h seguindo a correção dos cards anteriores. Deoxys não está no roster
 * de Megas — sprites curados manualmente (o CDN não tem `.fNORMAL`, a
 * forma Normal é o ícone base).
 */
export const megaMetagross: Evento = {
  slug: "mega-metagross",
  titulo: "Mega Metagross + Deoxys",
  periodo: {
    inicio: "2026-11-25T06:00:00-03:00",
    fim: "2026-12-01T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 25/11 às 6h até Terça, 01/12 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Deoxys, 25/11 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (25/11 → 01/12)",
      chefes: [{ nome: "Mega Metagross", tipos: ["Steel", "Psychic"] }],
    },
    {
      nivel: "Reides de 5 estrelas — as quatro formas do Deoxys (25/11 → 01/12)",
      chefes: [
        {
          nome: "Deoxys (Normal)",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm386.icon.png",
        },
        {
          nome: "Deoxys (Ataque)",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm386.fATTACK.icon.png",
        },
        {
          nome: "Deoxys (Defesa)",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm386.fDEFENSE.icon.png",
        },
        {
          nome: "Deoxys (Velocidade)",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm386.fSPEED.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: é a rotação que destrava o Mega Metagross da bolsa — o plano marca \"0 de Mega Energia. Sem rotação de reide, não destrava\". Cada reide dá Energia Mega do Metagross, e Aço já tem o Metagross 3390 como titular. Deoxys Ataque é um atacante de Psíquico forte, mas Psíquico já está \"excelente\" (Mewtwo X 4724) — entra mais pelo shiny das quatro formas.",
    linkPlano: true,
  },
};
