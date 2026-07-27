import type {
  EvolucaoPokemon,
  EvolucaoReferencia,
} from "@/models/pokemonOficial";

function idDaEspecie(speciesUrl: string): string {
  return speciesUrl.split("/").filter(Boolean).pop() ?? "";
}

function imagemDaEspecie(speciesUrl: string): string {
  const id = idDaEspecie(speciesUrl);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function construirNo(no: any): EvolucaoReferencia {
  return {
    nome: no.species.name,
    numero: `#${idDaEspecie(no.species.url).padStart(3, "0")}`,
    imagem: imagemDaEspecie(no.species.url),
    proximas: no.evolves_to.map(construirNo),
  };
}

function encontrarNo(
  no: EvolucaoReferencia,
  nomePokemon: string,
): EvolucaoReferencia | null {
  if (no.nome === nomePokemon) {
    return no;
  }

  for (const proxima of no.proximas) {
    const encontrado = encontrarNo(proxima, nomePokemon);

    if (encontrado) {
      return encontrado;
    }
  }

  return null;
}

function encontrarAnterior(
  no: EvolucaoReferencia,
  nomePokemon: string,
): EvolucaoReferencia | null {
  for (const proxima of no.proximas) {
    if (proxima.nome === nomePokemon) {
      return no;
    }

    const encontrado = encontrarAnterior(proxima, nomePokemon);

    if (encontrado) {
      return encontrado;
    }
  }

  return null;
}

export function flattenNomesEvolucao(
  nos: EvolucaoReferencia[],
): string[] {
  return nos.flatMap((no) => [
    no.nome,
    ...flattenNomesEvolucao(no.proximas),
  ]);
}

export function obterEvolucaoPokemon(
  cadeiaEvolutiva: any,
  nomePokemon: string,
): EvolucaoPokemon {
  const raiz = construirNo(cadeiaEvolutiva.chain);
  const atual = encontrarNo(raiz, nomePokemon);
  const anterior = encontrarAnterior(raiz, nomePokemon);

  return {
    anteriores: anterior ? [anterior] : [],
    proximas: atual ? atual.proximas : [],
  };
}
