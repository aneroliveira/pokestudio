import type { Evento } from "@/models/evento";

/**
 * Fontes: leekduck.com/events/pokemon-go-fest-2026-mega-finale e
 * pokemongohub.net/post/event/pokemon-go-fest-2026-mega-finale (confirmam
 * horário, bônus e as três estreias); pokemongo.com/en/news/megafinale-2026-armored-mewtwo
 * confirma o retorno do Mewtwo de Armadura (reide 5 estrelas, sem shiny).
 * Raids: mantidos só Mega Mewtwo X/Y e o Mewtwo de Armadura — o evento
 * também roda ~30 chefes de Mega Raid por habitat/horário (Beedrill,
 * Alakazam, Steelix, Gyarados etc.), mas isso é agenda geral do evento, não
 * curadoria do plano da Lori; incluir tudo viraria ruído sem ajudar a
 * decisão "o que fazer".
 */
export const goFest2026MegaFinale: Evento = {
  slug: "gofest-2026-mega-finale",
  titulo: "GO Fest 2026: Mega Finale",
  periodo: {
    inicio: "2026-09-05T10:00:00-03:00",
    fim: "2026-09-06T18:00:00-03:00",
  },
  periodoTexto: "5/09 (sáb) 10h → 6/09 (dom) 18h de 2026 (horário local)",
  tema: "psiquico",
  badge: "Reides remotos sem limite + estreia de 3 Megas de Kalos",
  estreias: {
    lista: [
      {
        nome: "Mega Chesnaught",
        tipos: ["Grass", "Fighting"],
        origem: "Pesquisa Ramificada — escolher Chespin.",
      },
      {
        nome: "Mega Delphox",
        tipos: ["Fire", "Psychic"],
        origem: "Pesquisa Ramificada — escolher Fennekin.",
      },
      {
        nome: "Mega Greninja",
        tipos: ["Water", "Dark"],
        origem: "Pesquisa Ramificada — escolher Froakie.",
      },
    ],
    dica:
      "a pesquisa só deixa escolher UM dos três iniciais — os outros dois ficam de fora dessa vez.",
  },
  reides: [
    {
      nivel: "Sábado 05/09 — Super Mega Raids",
      chefes: [{ nome: "Mega Mewtwo X", tipos: ["Psychic", "Fighting"] }],
    },
    {
      nivel: "Domingo 06/09 — Super Mega Raids",
      chefes: [{ nome: "Mega Mewtwo Y", tipos: ["Psychic"] }],
    },
    {
      nivel: "Sábado e domingo — 5 estrelas",
      chefes: [{ nome: "Mewtwo de Armadura", tipos: ["Psychic"] }],
    },
  ],
  notaCuradoria: {
    texto: [
      'Só dá pra escolher um dos três iniciais — vale o Mega Chesnaught: Planta é o tipo mais fraco dos três no plano ("baixa", só Roserade/Rillaboom), enquanto Fogo e Psíquico já estão bem resolvidos (Chandelure, Mewtwo Y).',
      "",
      "O Mewtwo X 4724 e o Mewtwo Y 2387 do plano já são os titulares das megas do fim de semana — não precisa recapturar, só conferir o Passe GO: Mega Finale (31/08–06/09) pela Mega Energia bônus.",
      "",
      "O Mewtwo de Armadura volta em reide de 5 estrelas nos dois dias — pela primeira vez desde 2020, mas sem versão shiny dessa vez. Vale mais pela raridade/coleção do que como atacante: até agora não saiu confirmação oficial de moveset.",
    ].join("\n"),
    linkPlano: true,
  },
};
