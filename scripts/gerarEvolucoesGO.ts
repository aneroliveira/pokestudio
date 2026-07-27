import fs from "node:fs";
import path from "node:path";

// Gera data/evolucoesGO.json com o custo de cada evolução no Pokémon GO
// (doces, item e missão especial), que NÃO existem na PokéAPI — ela só
// descreve os gatilhos do jogo principal (nível, felicidade, troca...).
// Mesma fonte dos outros geradores de GO (GAME_MASTER da comunidade).
//
// Uso: npx tsx scripts/gerarEvolucoesGO.ts [arquivo-local.json]

console.log("===================================");
console.log(" Gerador de Evoluções do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

type EvolucaoApi = {
  id: string;
  candies: number | null;
  item: { names: { English: string } } | null;
  quests: { names: { English: string } }[];
};

type EntradaApi = {
  id: string;
  evolutions?: EvolucaoApi[] | null;
};

type RequisitoEvolucaoGO = {
  para: string;
  doces: number | null;
  item: string | null;
  quest: string | null;
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

async function main() {
  const dados = await carregarFonte(process.argv[2]);

  const evolucoes: Record<string, RequisitoEvolucaoGO[]> = {};

  for (const entrada of dados) {
    if (!entrada.evolutions || entrada.evolutions.length === 0) continue;

    evolucoes[entrada.id.toLowerCase()] = entrada.evolutions.map((e) => ({
      para: e.id.toLowerCase(),
      doces: e.candies ?? null,
      item: e.item?.names.English ?? null,
      quest: e.quests[0]?.names.English ?? null,
    }));
  }

  const outputPath = path.resolve(process.cwd(), "data/evolucoesGO.json");
  fs.writeFileSync(outputPath, JSON.stringify(evolucoes, null, 2));

  console.log(
    `✔ ${Object.keys(evolucoes).length} Pokémon com evolução gerados em: ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
