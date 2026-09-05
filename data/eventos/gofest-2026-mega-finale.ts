import type { Evento } from "@/models/evento";

/**
 * Fontes: leekduck.com/events/pokemon-go-fest-2026-mega-finale e
 * pokemongohub.net/post/event/pokemon-go-fest-2026-mega-finale (confirmam
 * horário, bônus e as três estreias); pokemongo.com/en/news/megafinale-2026-armored-mewtwo
 * + infográfico da PKMNLens (print "mewtwo armadura.jpeg" da Lori) confirmam
 * o retorno do Mewtwo de Armadura (reide 5 estrelas, sem shiny, CP 100%
 * 1821/2276 — batendo nas duas fontes); leekduck.com/gofest/raids/ confirma
 * a grade completa de Mega Raids por habitat/horário (30 chefes) em
 * gradeMegaRaids, separada por dia em abas — pedido explícito da Lori pro
 * dia do evento (nomes batem com data/megas.json, imagem/CP derivados de lá
 * em runtime; só o Mewtwo de Armadura, que não é Mega, tem imagem/CP
 * curados manualmente — pm150.fA.icon.png no repo de assets do mirror).
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
      nivel: "Fim de semana — reides principais",
      chefes: [
        { nome: "Mega Mewtwo X", tipos: ["Psychic", "Fighting"] },
        { nome: "Mega Mewtwo Y", tipos: ["Psychic"] },
        {
          nome: "Mewtwo de Armadura",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm150.fA.icon.png",
          escala: 1.269,
          cpSemClima: 1821,
          cpComClima: 2276,
        },
      ],
    },
  ],
  gradeMegaRaids: {
    titulo: "Mega Raids por horário",
    dias: [
      {
        rotulo: "Sábado 05/09",
        grupos: [
          {
            horario: "10h–11h e 14h–15h",
            habitat: "Verdant Overgrowth",
            megas: ["Mega Beedrill", "Mega Victreebel", "Mega Pinsir", "Mega Abomasnow"],
          },
          {
            horario: "11h–12h e 15h–16h",
            habitat: "Mindworks Canal",
            megas: ["Mega Alakazam", "Mega Slowbro", "Mega Starmie", "Mega Medicham"],
          },
          {
            horario: "12h–13h e 16h–17h",
            habitat: "Eerie Alley",
            megas: ["Mega Gengar", "Mega Houndoom", "Mega Banette", "Mega Malamar"],
          },
          {
            horario: "13h–14h e 17h–18h",
            habitat: "Circuit Plaza",
            megas: ["Mega Raichu X", "Mega Ampharos", "Mega Manectric"],
          },
        ],
      },
      {
        rotulo: "Domingo 06/09",
        grupos: [
          {
            horario: "10h–11h e 14h–15h",
            habitat: "Iron Frostworks",
            megas: ["Mega Steelix", "Mega Skarmory", "Mega Aggron", "Mega Glalie"],
          },
          {
            horario: "11h–12h e 15h–16h",
            habitat: "Battle District",
            megas: ["Mega Sharpedo", "Mega Camerupt", "Mega Lopunny", "Mega Falinks"],
          },
          {
            horario: "12h–13h e 16h–17h",
            habitat: "Skyline Roosts",
            megas: ["Mega Gyarados", "Mega Aerodactyl", "Mega Dragonite", "Mega Altaria"],
          },
          {
            horario: "13h–14h e 17h–18h",
            habitat: "Prism Promenade",
            megas: ["Mega Raichu Y", "Mega Sableye", "Mega Mawile", "Mega Audino"],
          },
        ],
      },
    ],
  },
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
