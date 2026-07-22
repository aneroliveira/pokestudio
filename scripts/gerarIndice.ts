import fs from "node:fs";
import path from "node:path";

// Gera data/pokemonIndex.json a partir de UMA chamada à lista da PokéAPI.
// Não faz fetch por Pokémon — apenas id/numero/nomeEn para a busca.
// Uso: npx tsx scripts/gerarIndice.ts

console.log("===================================");
console.log(" Gerador de Índice de Pokémon");
console.log("===================================");

const LIMITE_FORMAS = 10000; // ids >= 10000 são formas alternativas

async function main() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000",
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar a lista da PokéAPI.");
  }

  const dados = (await response.json()) as {
    results: { name: string; url: string }[];
  };

  const indice = dados.results
    .map((item) => {
      const id = Number(
        item.url.split("/").filter(Boolean).pop(),
      );
      return { id, numero: `#${String(id).padStart(3, "0")}`, nomeEn: item.name };
    })
    .filter((item) => item.id < LIMITE_FORMAS)
    .sort((a, b) => a.id - b.id);

  const outputPath = path.resolve(
    process.cwd(),
    "data/pokemonIndex.json",
  );

  fs.writeFileSync(outputPath, JSON.stringify(indice, null, 2));

  console.log(`✔ ${indice.length} Pokémon indexados em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
