import fs from "node:fs";
import path from "node:path";
import {
  FONTE_POKEDEX,
  medirEscala,
  resolverImagensForma,
} from "./assetsGO";

// Gera data/gigantamax.json com as espécies que têm forma Gigantamax no
// Pokémon GO (imagem normal/shiny e escala), a partir do mirror
// pokemon-go-api — o mesmo de gerarMegas.ts.
// RFC-006 (herda a regra da RFC-002): roster é dado oficial/externo, nunca
// curadoria do studio.
// Uso: npx tsx scripts/gerarGigantamax.ts

console.log("===================================");
console.log(" Gerador do roster de Gigantamax do GO");
console.log("===================================");

interface FormaAssetBruta {
  form?: string | null;
  costume?: string | null;
  image?: string;
  shinyImage?: string;
}

interface EntradaBruta {
  dexNr: number;
  names?: { English?: string };
  hasGigantamaxEvolution?: boolean;
  assetForms?: FormaAssetBruta[];
}

interface EntradaGigantamax {
  numeroBase: string;
  nome: string;
  imagem?: string;
  imagemShiny?: string;
  /** Mesmo papel da `escala` das Megas (ver medirEscala em assetsGO.ts). */
  escala?: number;
}

async function main() {
  const response = await fetch(FONTE_POKEDEX);

  if (!response.ok) {
    throw new Error("Erro ao buscar a pokemon-go-api.");
  }

  const dados = (await response.json()) as EntradaBruta[];

  // Uma entrada por espécie: formas da mesma espécie (ex.: Toxtricity
  // Amped/Low Key) dividem o mesmo Gigantamax.
  const porNumero = new Map<number, EntradaBruta>();
  for (const entrada of dados) {
    if (entrada.hasGigantamaxEvolution && !porNumero.has(entrada.dexNr)) {
      porNumero.set(entrada.dexNr, entrada);
    }
  }

  console.log(`Conferindo imagens de ${porNumero.size} Gigantamax...`);

  const gigantamax: EntradaGigantamax[] = await Promise.all(
    [...porNumero.values()].map(async (entrada) => {
      const forma = entrada.assetForms?.find(
        (item) => item.form === "GIGANTAMAX" && !item.costume,
      );

      const imagens = await resolverImagensForma(entrada.dexNr, "GIGANTAMAX", {
        imagem: forma?.image,
        imagemShiny: forma?.shinyImage,
      });

      const escala = imagens.imagem
        ? await medirEscala(imagens.imagem)
        : undefined;

      return {
        numeroBase: `#${entrada.dexNr}`,
        nome: entrada.names?.English ?? `#${entrada.dexNr}`,
        ...imagens,
        ...(escala !== undefined ? { escala } : {}),
      };
    }),
  );

  const semImagem = gigantamax.filter((item) => !item.imagem);
  if (semImagem.length > 0) {
    console.warn(
      `⚠ Sem imagem de Gigantamax: ${semImagem.map((item) => item.nome).join(", ")}`,
    );
  }

  gigantamax.sort(
    (a, b) =>
      Number(a.numeroBase.replace("#", "")) -
      Number(b.numeroBase.replace("#", "")),
  );

  const outputPath = path.resolve(process.cwd(), "data/gigantamax.json");
  fs.writeFileSync(outputPath, JSON.stringify(gigantamax, null, 2));

  console.log(`✔ ${gigantamax.length} Gigantamax gerados em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
