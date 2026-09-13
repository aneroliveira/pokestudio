import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Inclui também o
 * "Dia de Batalhas GMax" (03/10, sáb, 14h–17h, G-Cinderace) — cai dentro da
 * mesma janela e não tinha arquivo próprio no plano aprovado, então foi
 * encaixado aqui como destaque secundário (mesmo tratamento dado ao Mega
 * Staraptor dentro do Mega Venusaur, e ao Xerneas dentro do Mega
 * Victreebel). Nem Zekrom Sombroso nem G-Cinderace estão no roster de
 * Megas — usam sprite curado manualmente (G-Cinderace com a forma
 * Gigantamax, `.fGIGANTAMAX`), sem CP por falta de fonte confirmada.
 */
export const invasaoRocketZekrom: Evento = {
  slug: "invasao-rocket-zekrom",
  titulo: "Invasão da Equipe Rocket — Zekrom Sombroso",
  periodo: {
    inicio: "2026-10-02T00:00:00-03:00",
    fim: "2026-10-05T23:59:00-03:00",
  },
  periodoTexto: "02/10 (sex) meia-noite → 05/10 (seg) 2026 (horário local)",
  tema: "sombrio",
  badge: "Giovanni com Zekrom Sombroso",
  reides: [
    {
      nivel: "Invasão da Equipe Rocket — Giovanni (02→05/10)",
      chefes: [
        {
          nome: "Zekrom Sombroso",
          tipos: ["Dragon", "Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm644.icon.png",
        },
      ],
    },
    {
      nivel: "Dia de Batalhas GMax (03/10, 14h–17h)",
      chefes: [
        {
          nome: "G-Cinderace",
          tipos: ["Fire"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm815.fGIGANTAMAX.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Provavelmente o melhor pickup do mês inteiro: Elétrico está em \"buraco\" e Dragão já está \"pronto\" (Salamence 3671) — um Zekrom Sombroso (+20% de ataque) ataca os dois de uma vez, com prioridade máxima pro furo elétrico. Vale reservar uma Investida Furtiva ou Passe Premium especificamente pro Giovanni dessa semana.",
    linkPlano: true,
  },
};
