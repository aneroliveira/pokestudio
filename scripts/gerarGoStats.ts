import fs from "node:fs";
import path from "node:path";

// Gera data/goStats.json com as BASE STATS do Pokémon GO (attack/defense/
// stamina), que NÃO existem na PokéAPI e não são deriváveis dela. Fonte:
// pokemon-go-api (GAME_MASTER da comunidade). Formas base apenas.
// Uso: npx tsx scripts/gerarGoStats.ts

console.log("===================================");
console.log(" Gerador de Base Stats do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

async function main() {
  const response = await fetch(FONTE);

  if (!response.ok) {
    throw new Error("Erro ao buscar a pokemon-go-api.");
  }

  const dados = (await response.json()) as {
    dexNr: number;
    stats: { attack: number; defense: number; stamina: number };
  }[];

  const goStats: Record<
    string,
    { attack: number; defense: number; stamina: number }
  > = {};

  for (const entrada of dados) {
    if (!entrada.stats) continue;
    goStats[String(entrada.dexNr)] = {
      attack: entrada.stats.attack,
      defense: entrada.stats.defense,
      stamina: entrada.stats.stamina,
    };
  }

  const outputPath = path.resolve(process.cwd(), "data/goStats.json");
  fs.writeFileSync(outputPath, JSON.stringify(goStats, null, 2));

  console.log(
    `✔ ${Object.keys(goStats).length} base stats gerados em: ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
