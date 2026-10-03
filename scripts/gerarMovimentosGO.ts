import fs from "node:fs";
import path from "node:path";

// Gera as duas fontes locais de golpes do Pokémon GO:
//
//   data/movimentosGO.ts   -> catálogo MOVIMENTOS_GO (id, nome, tipo, categoria)
//   data/movepoolsGO.json  -> movepool por número da dex, separando os golpes
//                             legados (Elite TM) dos obtidos por TM comum
//
// Os golpes do GO NÃO existem na PokéAPI: o que ela expõe é o movepool da
// série principal, que não corresponde ao do jogo. Mesma fonte do
// gerarGoStats.ts (GAME_MASTER da comunidade). Formas base apenas.
//
// Nome em português: a pokemon-go-api não publica PT-BR, então vem dos
// textos do próprio jogo extraídos pelo PokeMiners (o mesmo repositório dos
// ícones), casando pelo nome em inglês. Golpe que o texto ainda não tem
// (golpes novos) fica com o nome em inglês e sai listado no console.
//
// Uso: npx tsx scripts/gerarMovimentosGO.ts [arquivo-local.json]
// O argumento opcional lê um pokedex.json já baixado, em vez de ir na rede.

console.log("===================================");
console.log(" Gerador de Movimentos do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

const TEXTOS_JOGO =
  "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/JSON";

// Espelha TipoPokemon (models/shared.ts). A fonte já entrega o tipo em
// inglês, que é o canônico do domínio — mas validamos para não gravar um
// tipo novo silenciosamente se a API mudar.
const TIPOS_VALIDOS = new Set([
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
]);

type MovimentoApi = {
  id: string;
  type: { names: { English: string } };
  names: { English: string };
};

type EntradaApi = {
  dexNr: number;
  quickMoves?: Record<string, MovimentoApi> | null;
  cinematicMoves?: Record<string, MovimentoApi> | null;
  eliteQuickMoves?: Record<string, MovimentoApi> | null;
  eliteCinematicMoves?: Record<string, MovimentoApi> | null;
};

type Catalogo = {
  id: string;
  nomeEn: string;
  nomePt: string;
  tipo: string;
  categoria: "Rapido" | "Carregado";
};

async function carregarFonte(local?: string): Promise<EntradaApi[]> {
  if (local) {
    console.log(`→ lendo fonte local: ${local}`);
    return JSON.parse(fs.readFileSync(local, "utf-8")) as EntradaApi[];
  }

  console.log(`→ buscando ${FONTE}`);
  const response = await fetch(FONTE);

  if (!response.ok) {
    throw new Error("Erro ao buscar a pokemon-go-api.");
  }

  return (await response.json()) as EntradaApi[];
}

/** Textos do jogo vêm como [chave, valor, chave, valor, ...]. */
async function carregarTexto(idioma: string): Promise<Map<string, string>> {
  const url = `${TEXTOS_JOGO}/i18n_${idioma}.json`;
  console.log(`→ buscando ${url}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os textos do jogo (${idioma}).`);
  }

  const { data } = (await response.json()) as { data: string[] };
  const textos = new Map<string, string>();
  for (let i = 0; i < data.length; i += 2) textos.set(data[i], data[i + 1]);
  return textos;
}

/** Nome em inglês -> nome no jogo em PT-BR, pelas chaves move_name_NNNN. */
async function carregarNomesPt(): Promise<Map<string, string>> {
  const [en, pt] = await Promise.all([
    carregarTexto("english"),
    carregarTexto("brazilianportuguese"),
  ]);

  const nomes = new Map<string, string>();
  for (const [chave, nomeEn] of en) {
    const nomePt = pt.get(chave);
    if (chave.startsWith("move_name_") && nomePt) nomes.set(nomeEn, nomePt);
  }
  return nomes;
}

/** Serializa o catálogo como TS, no formato de MovimentoGO[]. */
function montarArquivoCatalogo(movimentos: Catalogo[]): string {
  const corpo = movimentos
    .map(
      (m) => `  {
    id: "${m.id}",
    nome: { ptBR: ${JSON.stringify(m.nomePt)}, enUS: ${JSON.stringify(m.nomeEn)} },
    tipo: "${m.tipo}",
    categoria: "${m.categoria}",
  },`,
    )
    .join("\n");

  return `import { MovimentoGO } from "@/models/pokemon";

// GERADO por scripts/gerarMovimentosGO.ts — não editar à mão.
// ptBR é o nome do golpe no jogo em português (textos do PoGO via
// PokeMiners); golpe que ainda não está lá repete o nome em inglês.

export const MOVIMENTOS_GO: MovimentoGO[] = [
${corpo}
];
`;
}

async function main() {
  const dados = await carregarFonte(process.argv[2]);
  const nomesPt = await carregarNomesPt();
  const semTraducao: string[] = [];

  const catalogo = new Map<string, Catalogo>();
  const movepools: Record<
    string,
    {
      rapidos: string[];
      carregados: string[];
      rapidosLegado: string[];
      carregadosLegado: string[];
    }
  > = {};

  const registrar = (
    movimentos: Record<string, MovimentoApi> | null | undefined,
    categoria: "Rapido" | "Carregado",
  ): string[] => {
    if (!movimentos) return [];

    return Object.values(movimentos).map((movimento) => {
      const tipo = movimento.type?.names?.English;

      if (!tipo || !TIPOS_VALIDOS.has(tipo)) {
        throw new Error(
          `Tipo desconhecido em ${movimento.id}: ${String(tipo)}`,
        );
      }

      if (!catalogo.has(movimento.id)) {
        const nomeEn = movimento.names.English;
        const nomePt = nomesPt.get(nomeEn);
        if (!nomePt) semTraducao.push(nomeEn);

        catalogo.set(movimento.id, {
          id: movimento.id,
          nomeEn,
          nomePt: nomePt ?? nomeEn,
          tipo,
          categoria,
        });
      }

      return movimento.id;
    });
  };

  for (const entrada of dados) {
    const movepool = {
      rapidos: registrar(entrada.quickMoves, "Rapido"),
      carregados: registrar(entrada.cinematicMoves, "Carregado"),
      rapidosLegado: registrar(entrada.eliteQuickMoves, "Rapido"),
      carregadosLegado: registrar(entrada.eliteCinematicMoves, "Carregado"),
    };

    // Sem nenhum golpe não há o que registrar (formas não implementadas).
    const total = Object.values(movepool).reduce(
      (soma, lista) => soma + lista.length,
      0,
    );
    if (total === 0) continue;

    movepools[String(entrada.dexNr)] = movepool;
  }

  const movimentos = [...catalogo.values()].sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  const catalogoPath = path.resolve(process.cwd(), "data/movimentosGO.ts");
  fs.writeFileSync(catalogoPath, montarArquivoCatalogo(movimentos));

  const movepoolsPath = path.resolve(process.cwd(), "data/movepoolsGO.json");
  fs.writeFileSync(movepoolsPath, JSON.stringify(movepools, null, 2));

  const legados = Object.values(movepools).filter(
    (m) => m.rapidosLegado.length > 0 || m.carregadosLegado.length > 0,
  ).length;

  console.log(`✔ ${movimentos.length} golpes gerados em: ${catalogoPath}`);
  console.log(
    `✔ ${Object.keys(movepools).length} movepools gerados em: ${movepoolsPath}`,
  );
  console.log(`  (${legados} Pokémon com golpe legado / Elite TM)`);

  if (semTraducao.length > 0) {
    console.log(
      `  ${semTraducao.length} golpe(s) sem nome PT-BR nos textos do jogo, mantidos em inglês: ${semTraducao.sort().join(", ")}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
