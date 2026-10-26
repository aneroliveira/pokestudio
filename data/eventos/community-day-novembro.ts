import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/communityday-november-2026-pawniard e
 * leekduck.com/events/november-communityday2026 (confirmado 26/10/2026).
 * Golpe exclusivo: Humilhação Dividida (Kowtow Cleave) no Kingambit. Das
 * 14h às 21h o Bisharp evolui pra Kingambit só derrotando 1 chefe de reide
 * Sombrio ou Aço (sem precisar do requisito normal), e vale pra qualquer
 * Bisharp, não só o companheiro. Slug mantido de quando o Pokémon ainda não
 * tinha sido anunciado, pra não quebrar link.
 */
export const communityDayNovembro: Evento = {
  slug: "community-day-novembro",
  titulo: "Community Day: Pawniard",
  periodo: {
    inicio: "2026-11-21T14:00:00-03:00",
    fim: "2026-11-21T21:00:00-03:00",
  },
  periodoTexto: "Sábado, 21/11, das 14h às 17h (horário local — bônus estendido até 21h)",
  tema: "comunidade",
  badge: "Kingambit com Humilhação Dividida — evolua até 21h",
  encontros: [
    {
      nome: "Pawniard",
      tipos: ["Dark", "Steel"],
      nota: "Selvagem, com mais chance de shiny e de Fundo Especial. Das 14h às 21h, aparece muito em Módulos Atrair comuns.",
      shiny: true,
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: Kingambit com Humilhação Dividida (85 de poder em reide) é um dos melhores atacantes de Sombrio que não são lendários. Sombrio já está \"excelente\" no plano (Hydreigon 3764), então é reforço, não lacuna — mas vale garantir pelo menos um. Pra evoluir até 21h: derrotar 1 chefe de reide Sombrio ou Aço (vale pra qualquer Bisharp). Bônus 14h–17h: 2× Doce em capturas, 2× chance de Doce GG pra nível 31+, ovos chocam com 1/4 da distância, Incenso de 3h e surpresa em retratos. Até 21h: Módulo Atrair de 1h, +1 Troca Especial (máx. 2 no dia) com 50% menos Poeira. Pesquisa Especial paga (US$1,99): 3 Pawniard com Fundo Especial, Passe de Reide Premium e Doce Raro GG.",
    linkPlano: true,
  },
};
