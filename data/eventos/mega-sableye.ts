import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-sableye-in-mega-raids-october-2026 e
 * leekduck.com/events/giratina-origin-forme-in-5-star-raid-battles-october-2026
 * (confirmado 12/10/2026) — 28/10 6h → 03/11, Hora de Reide da Giratina em
 * 28/10 18h–19h. O Leek Duck diz 22h no fim; mantenho 21h seguindo a
 * correção dos cards anteriores. O nível Super Max do Mega Sableye (com
 * Sombra Noturna+) vem do Halloween Parte II, a partir de 01/11. Giratina
 * não está no roster de Megas — usa sprite curado manualmente.
 */
export const megaSableye: Evento = {
  slug: "mega-sableye",
  titulo: "Mega Sableye + Giratina (Origem)",
  periodo: {
    inicio: "2026-10-28T06:00:00-03:00",
    fim: "2026-11-03T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 28/10 às 6h até Terça, 03/11 às 21h (horário local)",
  tema: "mega",
  badge: "Hora de Reide extra: Giratina, 28/10 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (28/10 → 03/11)",
      chefes: [{ nome: "Mega Sableye", tipos: ["Dark", "Ghost"] }],
    },
    {
      nivel: "Reides de 5 estrelas — Giratina Forma Origem (28/10 → 03/11)",
      chefes: [
        {
          nome: "Giratina (Origem)",
          tipos: ["Ghost", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm487.fORIGIN.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: Fantasma está \"subnivelado\" no plano (Lunala 2289 → Gengar 2049), e Giratina Origem é um dos melhores atacantes de Fantasma — a semana inteira de reides é a chance de fechar essa lacuna (hoje só tem uma sombrosa 2310 na reserva). Mega Sableye também é Fantasma/Sombrio e, a partir de 01/11, pode chegar ao nível Super Max com Sombra Noturna+.",
    linkPlano: true,
  },
};
