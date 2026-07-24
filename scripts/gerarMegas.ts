import fs from "node:fs";
import path from "node:path";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";

// Gera data/megas.json com o roster de Mega Evoluções (e Primal) do Pokémon
// GO — nome, tipos, categoria e base stats — a partir do mirror pokemon-go-api.
// RFC-002: roster é dado oficial/externo, nunca curadoria do studio.
// Uso: npx tsx scripts/gerarMegas.ts

console.log("===================================");
console.log(" Gerador do roster de Megas do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

interface MegaBruto {
  names?: { English?: string };
  stats?: { attack: number; defense: number; stamina: number };
  primaryType?: { type: string };
  secondaryType?: { type: string } | null;
  assets?: { image?: string };
}

interface EntradaBruta {
  dexNr: number;
  megaEvolutions?: Record<string, MegaBruto>;
}

interface EntradaMega {
  id: string;
  nome: string;
  numeroBase: string;
  categoria: "Mega" | "Primal";
  tipos: TipoPokemon[];
  stats: { attack: number; defense: number; stamina: number };
  imagem?: string;
}

function mapearTipo(bruto: string): TipoPokemon {
  const chave = bruto.replace("POKEMON_TYPE_", "").toLowerCase();
  const tipo = TIPOS_POKEMON[chave];
  if (!tipo) {
    throw new Error(`Tipo desconhecido vindo do mirror: "${bruto}"`);
  }
  return tipo;
}

function mapearTipos(mega: MegaBruto): TipoPokemon[] {
  const tipos: TipoPokemon[] = [];
  if (mega.primaryType?.type) tipos.push(mapearTipo(mega.primaryType.type));
  if (mega.secondaryType?.type) tipos.push(mapearTipo(mega.secondaryType.type));
  return tipos;
}

async function main() {
  const response = await fetch(FONTE);

  if (!response.ok) {
    throw new Error("Erro ao buscar a pokemon-go-api.");
  }

  const dados = (await response.json()) as EntradaBruta[];

  const megas: EntradaMega[] = [];

  for (const entrada of dados) {
    if (!entrada.megaEvolutions) continue;

    for (const [id, mega] of Object.entries(entrada.megaEvolutions)) {
      if (!mega.stats || !mega.primaryType) continue;

      megas.push({
        id,
        nome: mega.names?.English ?? id,
        numeroBase: `#${entrada.dexNr}`,
        categoria: id.includes("PRIMAL") ? "Primal" : "Mega",
        tipos: mapearTipos(mega),
        stats: {
          attack: mega.stats.attack,
          defense: mega.stats.defense,
          stamina: mega.stats.stamina,
        },
        imagem: mega.assets?.image,
      });
    }
  }

  megas.sort(
    (a, b) =>
      Number(a.numeroBase.replace("#", "")) -
        Number(b.numeroBase.replace("#", "")) ||
      a.id.localeCompare(b.id),
  );

  const outputPath = path.resolve(process.cwd(), "data/megas.json");
  fs.writeFileSync(outputPath, JSON.stringify(megas, null, 2));

  console.log(`✔ ${megas.length} Megas geradas em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
