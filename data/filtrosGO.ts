import type { CategoriaFiltro } from "@/models/filtroGO";

// Palavras-chave da busca do Pokémon GO em PT-BR. Fonte: textos do próprio
// jogo extraídos pelo PokeMiners (`i18n_brazilianportuguese.json`, chaves
// `filter_key_*` e `pokemon_type_*`) — o jogo em português só entende os
// termos traduzidos, então nada aqui é tradução nossa. A busca não liga pra
// maiúscula, então tudo fica em minúsculo.
//
// Fora do `filter_key_*` (vêm de outros textos do jogo, conferir no app se
// algum não funcionar): `evoluir`, `pc`, `ps` e os nomes de região.

const TIPOS = [
  "aço",
  "água",
  "dragão",
  "elétrico",
  "fada",
  "fantasma",
  "fogo",
  "gelo",
  "inseto",
  "lutador",
  "normal",
  "pedra",
  "planta",
  "psíquico",
  "sombrio",
  "terrestre",
  "venenoso",
  "voador",
] as const;

const REGIOES = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "hisui",
  "paldea",
] as const;

/** Tira o `#`/`+`/`@` que a pessoa já tenha digitado — o modelo põe o dele. */
function semPrefixo(valor: string, prefixo: string) {
  const limpo = valor.trim().replace(new RegExp(`^\\${prefixo}+`), "").trim();
  return limpo || null;
}

export const CATEGORIAS_FILTRO: CategoriaFiltro[] = [
  {
    id: "avaliacao",
    titulo: "Avaliação",
    itens: [
      { tipo: "termo", termo: "4*", descricao: "Perfeitos (IV 100%)" },
      { tipo: "termo", termo: "3*", descricao: "3 estrelas (IV 82–98%)" },
      { tipo: "termo", termo: "2*", descricao: "2 estrelas (IV 67–80%)" },
      { tipo: "termo", termo: "1*", descricao: "1 estrela (IV 51–64%)" },
      { tipo: "termo", termo: "0*", descricao: "0 estrela (IV até 49%)" },
      { tipo: "termo", termo: "0ataque", descricao: "Ataque zerado — bom pra Liga Grande/Ultra" },
      { tipo: "termo", termo: "4ataque", descricao: "Barra de ataque cheia" },
      { tipo: "termo", termo: "4defesa", descricao: "Barra de defesa cheia" },
      { tipo: "termo", termo: "4ps", descricao: "Barra de PS cheia" },
    ],
  },
  {
    id: "especiais",
    titulo: "Especiais",
    itens: [
      { tipo: "termo", termo: "brilhante", descricao: "Shiny" },
      { tipo: "termo", termo: "sombroso", descricao: "Sombrosos (Shadow)" },
      { tipo: "termo", termo: "purificado", descricao: "Purificados" },
      { tipo: "termo", termo: "sortudo", descricao: "Sortudos" },
      { tipo: "termo", termo: "lendário", descricao: "Lendários" },
      { tipo: "termo", termo: "mítico", descricao: "Míticos" },
      { tipo: "termo", termo: "ultracriatura", descricao: "Ultracriaturas" },
      { tipo: "termo", termo: "traje", descricao: "Com traje de evento" },
      { tipo: "termo", termo: "dinamax", descricao: "Dinamax" },
      { tipo: "termo", termo: "gigamax", descricao: "Gigamax" },
      { tipo: "termo", termo: "fusão", descricao: "Fundidos (Kyurem, Necrozma, Calyrex)" },
      { tipo: "termo", termo: "duplicado", descricao: "Espécies que você tem mais de um" },
      { tipo: "termo", termo: "hipertreinamento", descricao: "Com hipertreinamento" },
      { tipo: "termo", termo: "defensor", descricao: "Defendendo um ginásio agora" },
      { tipo: "termo", termo: "apenasovos", descricao: "Bebês (só nascem de ovo)" },
    ],
  },
  {
    id: "evolucao",
    titulo: "Evolução",
    itens: [
      { tipo: "termo", termo: "evoluir", descricao: "Já dá pra evoluir (tem doce)" },
      { tipo: "termo", termo: "evoluirnovo", descricao: "Evolução que falta na sua Pokédex" },
      { tipo: "termo", termo: "evoluirportroca", descricao: "Evolui de graça se for trocado" },
      { tipo: "termo", termo: "item", descricao: "Evolui com item" },
      { tipo: "termo", termo: "evoluirmissao", descricao: "Evolui com missão (ex.: andar como companheiro)" },
      { tipo: "termo", termo: "megaevolui", descricao: "Pode megaevoluir" },
      {
        tipo: "texto",
        id: "familia",
        rotulo: "+nome",
        descricao: "A família evolutiva inteira",
        placeholder: "eevee",
        montar: (valor) => {
          const nome = semPrefixo(valor, "+");
          return nome ? `+${nome}` : null;
        },
      },
    ],
  },
  {
    id: "origem",
    titulo: "Origem",
    itens: [
      { tipo: "termo", termo: "chocado", descricao: "Nasceram de ovo" },
      { tipo: "termo", termo: "pesquisa", descricao: "Recompensa de pesquisa" },
      { tipo: "termo", termo: "reide", descricao: "Pegos em reide" },
      { tipo: "termo", termo: "reideex", descricao: "Pegos em reide EX" },
      { tipo: "termo", termo: "megarreide", descricao: "Pegos em megarreide" },
      { tipo: "termo", termo: "reideprimitivo", descricao: "Pegos em reide primitivo" },
      { tipo: "termo", termo: "reideadistância", descricao: "Pegos em reide a distância" },
      { tipo: "termo", termo: "rocket", descricao: "Resgatados da Equipe Rocket" },
      { tipo: "termo", termo: "lbg", descricao: "Recompensa da Liga de Batalha GO" },
      { tipo: "termo", termo: "trocado", descricao: "Recebidos em troca" },
      { tipo: "termo", termo: "retrato", descricao: "Apareceram na foto (GO Snapshot)" },
      { tipo: "termo", termo: "grupo", descricao: "Pegos jogando em grupo" },
      { tipo: "termo", termo: "fundo", descricao: "Com qualquer fundo especial" },
      { tipo: "termo", termo: "fundoespecial", descricao: "Com fundo de evento" },
      { tipo: "termo", termo: "fundodelocalidade", descricao: "Com fundo de localidade" },
    ],
  },
  {
    id: "golpes",
    titulo: "Golpes",
    itens: [
      { tipo: "termo", termo: "@especial", descricao: "Tem golpe exclusivo (legado/Elite)" },
      { tipo: "termo", termo: "movimentomax", descricao: "Com Ataque Max liberado" },
      { tipo: "termo", termo: "guardamax", descricao: "Com Guarda Max liberada" },
      { tipo: "termo", termo: "espiritomax", descricao: "Com Espírito Max liberado" },
      {
        tipo: "texto",
        id: "golpe",
        rotulo: "@golpe",
        descricao: "Tem esse golpe (nome do jogo em PT-BR)",
        placeholder: "lança-chamas",
        montar: (valor) => {
          const nome = semPrefixo(valor, "@");
          return nome ? `@${nome}` : null;
        },
      },
      {
        tipo: "opcao",
        id: "golpe-rapido",
        rotulo: "@1tipo",
        descricao: "Golpe rápido desse tipo",
        opcoes: TIPOS,
        montar: (tipo) => `@1${tipo}`,
      },
      {
        tipo: "opcao",
        id: "golpe-carregado",
        rotulo: "@2tipo",
        descricao: "Golpe carregado desse tipo",
        opcoes: TIPOS,
        montar: (tipo) => `@2${tipo}`,
      },
      {
        tipo: "opcao",
        id: "golpe-segundo",
        rotulo: "@3tipo",
        descricao: "Segundo golpe carregado desse tipo",
        opcoes: TIPOS,
        montar: (tipo) => `@3${tipo}`,
      },
    ],
  },
  {
    id: "tipos",
    titulo: "Tipos",
    itens: TIPOS.map((tipo) => ({
      tipo: "termo" as const,
      termo: tipo,
      descricao: "",
    })),
  },
  {
    id: "regioes",
    titulo: "Regiões",
    itens: REGIOES.map((regiao) => ({
      tipo: "termo" as const,
      termo: regiao,
      descricao: "",
    })),
  },
  {
    id: "numeros",
    titulo: "Números",
    itens: [
      {
        tipo: "faixa",
        id: "pc",
        rotulo: "pc",
        descricao: "Faixa de PC",
        minimo: 0,
        montar: (faixa) => `pc${faixa}`,
      },
      {
        tipo: "faixa",
        id: "ps",
        rotulo: "ps",
        descricao: "Faixa de PS",
        minimo: 0,
        montar: (faixa) => `ps${faixa}`,
      },
      {
        tipo: "faixa",
        id: "pokedex",
        rotulo: "nº",
        descricao: "Faixa de número da Pokédex",
        minimo: 1,
        montar: (faixa) => faixa,
      },
      {
        tipo: "faixa",
        id: "idade",
        rotulo: "idade",
        descricao: "Dias desde a captura",
        minimo: 0,
        montar: (faixa) => `idade${faixa}`,
      },
      {
        tipo: "faixa",
        id: "distancia",
        rotulo: "distância",
        descricao: "Km entre onde pegou e onde você está",
        minimo: 0,
        montar: (faixa) => `distância${faixa}`,
      },
      {
        tipo: "faixa",
        id: "ano",
        rotulo: "ano",
        descricao: "Ano da captura",
        minimo: 2016,
        montar: (faixa) => `ano${faixa}`,
      },
      {
        tipo: "faixa",
        id: "total",
        rotulo: "total",
        descricao: "Quantos dessa espécie você tem",
        minimo: 1,
        montar: (faixa) => `total${faixa}`,
      },
      {
        tipo: "faixa",
        id: "docekm",
        rotulo: "docekm",
        descricao: "Km pra ganhar doce como companheiro",
        minimo: 1,
        montar: (faixa) => `docekm${faixa}`,
      },
    ],
  },
  {
    id: "genero",
    titulo: "Gênero",
    itens: [
      { tipo: "termo", termo: "macho", descricao: "" },
      { tipo: "termo", termo: "fêmea", descricao: "" },
      { tipo: "termo", termo: "gênerodesconhecido", descricao: "Sem gênero" },
    ],
  },
  {
    id: "tags",
    titulo: "Tags",
    itens: [
      {
        tipo: "texto",
        id: "tag",
        rotulo: "#tag",
        descricao: "Com essa tag sua",
        placeholder: "troca",
        montar: (valor) => {
          const nome = semPrefixo(valor, "#");
          return nome ? `#${nome}` : null;
        },
      },
      { tipo: "termo", termo: "#", descricao: "Com qualquer tag" },
      { tipo: "termo", termo: "!#", descricao: "Sem nenhuma tag" },
    ],
  },
];

/** Como combinar termos — vai na colinha do topo da aba. */
export const OPERADORES_FILTRO = [
  { simbolo: "&", descricao: "e — precisa bater os dois", exemplo: "4*&brilhante" },
  { simbolo: ",", descricao: "ou — basta um dos dois", exemplo: "fogo,água" },
  { simbolo: "!", descricao: "não — tira quem bate", exemplo: "!sombroso" },
  { simbolo: "-", descricao: "faixa — aberta numa ponta vale “até” ou “a partir de”", exemplo: "pc-1500" },
] as const;
