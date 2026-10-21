import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-sableye-in-mega-raids-october-2026,
 * leekduck.com/events/giratina-origin-forme-in-5-star-raid-battles-october-2026
 * e leekduck.com/events/giratina-altered-forme-in-5-star-raid-battles-november-2026
 * (atualizado 21/10/2026) — o Mega Sableye foi estendido até 08/11 (antes
 * terminava em 03/11, junto da Giratina Origem); a partir de 04/11 a
 * Giratina troca pra Forma Alterada. O Leek Duck diz 22h no fim; mantenho
 * 21h seguindo a correção dos cards anteriores. O nível Super Max do Mega
 * Sableye (com Sombra Noturna+) vem do Halloween Parte II, a partir de
 * 01/11. Giratina não está no roster de Megas — sprites curados manualmente.
 */
export const megaSableye: Evento = {
  slug: "mega-sableye",
  titulo: "Mega Sableye + Giratina",
  periodo: {
    inicio: "2026-10-28T06:00:00-03:00",
    fim: "2026-11-08T21:00:00-03:00",
  },
  periodoTexto: "Quarta, 28/10 às 6h até Domingo, 08/11 às 21h (horário local)",
  tema: "mega",
  badge: "Horas de Reide: Giratina Origem 28/10 e Alterada 04/11, 18h–19h",
  reides: [
    {
      nivel: "Mega Raids + reides comuns (28/10 → 08/11)",
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
    {
      nivel: "Reides de 5 estrelas — Giratina Forma Alterada (04/11 → 08/11)",
      chefes: [
        {
          nome: "Giratina (Alterada)",
          tipos: ["Ghost", "Dragon"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm487.fALTERED.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: Fantasma está \"subnivelado\" no plano (Lunala 2289 → Gengar 2049), e Giratina Origem é um dos melhores atacantes de Fantasma — a primeira semana (até 03/11) é a chance de fechar essa lacuna (hoje só tem uma sombrosa 2310 na reserva). A Forma Alterada (04/11 → 08/11) é mais defensiva — boa pra Ginásio, menos pra reide. Mega Sableye também é Fantasma/Sombrio e, a partir de 01/11, pode chegar ao nível Super Max com Sombra Noturna+ — agora com mais tempo pra juntar Energia Mega (até 08/11).",
    linkPlano: true,
  },
};
