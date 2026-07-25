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
// Uso: npx tsx scripts/gerarMovimentosGO.ts [arquivo-local.json]
// O argumento opcional lê um pokedex.json já baixado, em vez de ir na rede.

console.log("===================================");
console.log(" Gerador de Movimentos do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

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

/** Serializa o catálogo como TS, no formato de MovimentoGO[]. */
function montarArquivoCatalogo(movimentos: Catalogo[]): string {
  const corpo = movimentos
    .map(
      (m) => `  {
    id: "${m.id}",
    nome: { ptBR: ${JSON.stringify(m.nomeEn)}, enUS: ${JSON.stringify(m.nomeEn)} },
    tipo: "${m.tipo}",
    categoria: "${m.categoria}",
  },`,
    )
    .join("\n");

  return `import { MovimentoGO } from "@/models/pokemon";

// GERADO por scripts/gerarMovimentosGO.ts — não editar à mão.
// A fonte não publica nome em português, então ptBR repete enUS: o jogo é
// jogado com os nomes em inglês na curadoria e traduzir aqui seria inventar.

export const MOVIMENTOS_GO: MovimentoGO[] = [
${corpo}
];
`;
}

async function main() {
  const dados = await carregarFonte(process.argv[2]);

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
        catalogo.set(movimento.id, {
          id: movimento.id,
          nomeEn: movimento.names.English,
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
