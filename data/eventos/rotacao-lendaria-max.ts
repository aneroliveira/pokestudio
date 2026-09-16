import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/xurkitree-pheromosa-buzzwole-in-5-star-raid-battles-september-2026
 * e leekduck.com/events/raidhour20260909 (Segunda Max), confirmado
 * 16/09/2026. Une duas rotações que caem na mesma janela: Dynamax das aves
 * lendárias (21→27/09, começando na Segunda Max do dia 21, 6h–21h) e os
 * Reides Veteranos das Ultra Bestas (23→29/09, 6h→21h — corrigido de 22h a
 * partir de um card de reide mais preciso —, com Hora de Reide extra em
 * 23/09 18h–19h).
 *
 * Importante: as três Ultra Bestas são REGIONAIS, cada uma só aparece numa
 * parte do mundo — Xurkitree na Ásia-Pacífico, Pheromosa na Europa/Oriente
 * Médio/África/Índia, e só Buzzwole nas Américas (inclui o Brasil). Mantive
 * as três na lista pra referência, mas só Buzzwole é reide de verdade por
 * aqui. Nenhum dos chefes está no roster de Megas — sprites curados
 * manualmente, sem CP por falta de fonte confirmada.
 */
export const rotacaoLendariaMax: Evento = {
  slug: "rotacao-lendaria-max",
  titulo: "Rotação Lendária Max",
  periodo: {
    inicio: "2026-09-21T06:00:00-03:00",
    fim: "2026-09-29T21:00:00-03:00",
  },
  periodoTexto: "21/09 (seg) 6h → 29/09 (ter) 21h de 2026 (horário local)",
  tema: "lendario",
  badge: "Segunda Max: aves lendárias em Dynamax, 21/09 6h–21h",
  reides: [
    {
      nivel: "Dynamax — aves lendárias (21→27/09)",
      chefes: [
        {
          nome: "Articuno",
          tipos: ["Ice", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm144.icon.png",
        },
        {
          nome: "Zapdos",
          tipos: ["Electric", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm145.icon.png",
        },
        {
          nome: "Moltres",
          tipos: ["Fire", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm146.icon.png",
        },
      ],
    },
    {
      nivel: "Reides Veteranos — Américas/Brasil (23→29/09, Hora de Reide 23/09 18h–19h)",
      chefes: [
        {
          nome: "Buzzwole",
          tipos: ["Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm794.icon.png",
        },
      ],
    },
    {
      nivel: "Mesma rotação, outras regiões (não disponível no Brasil)",
      chefes: [
        {
          nome: "Xurkitree (Ásia-Pacífico)",
          tipos: ["Electric"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm796.icon.png",
        },
        {
          nome: "Pheromosa (Europa/Oriente Médio/África/Índia)",
          tipos: ["Bug", "Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm795.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Semana mais importante do mês pro plano: Elétrico está em \"buraco\" (só o Regieleki 1563 segurando as pontas) — Zapdos é o upgrade mais direto do calendário inteiro (Xurkitree seria ótimo também, mas é exclusivo da Ásia-Pacífico, não dá pra pegar daqui).",
      "",
      "Gelo está \"magro\" (titular Baxcalibur, reservas travadas nos Kyurem bloqueados) — Articuno ajuda a destravar essa lacuna. Voador também está \"baixa\", e as três aves reforçam isso de quebra.",
      "",
      "Buzzwole (o único Ultra Besta de verdade aqui nas Américas) já é reserva de Lutador (2451) — reforça, mas não é prioridade alta como as aves.",
    ].join("\n"),
    linkPlano: true,
  },
};
