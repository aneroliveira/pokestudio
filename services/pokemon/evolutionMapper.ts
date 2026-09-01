import type {
  CadeiaEvolutivaApi,
  NoEvolucaoApi,
} from "@/models/pokeApi";
import type {
  EvolucaoPokemon,
  EvolucaoReferencia,
  RequisitoEvolucao,
} from "@/models/pokemonOficial";
import evolucoesGO from "@/data/evolucoesGO.json";

const EVOLUCOES_GO: Record<
  string,
  { para: string; doces: number | null; item: string | null; quest: string | null }[]
> = evolucoesGO;

function idDaEspecie(speciesUrl: string): string {
  return speciesUrl.split("/").filter(Boolean).pop() ?? "";
}

function imagemDaEspecie(speciesUrl: string): string {
  const id = idDaEspecie(speciesUrl);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function requisitoDoGO(
  nomeAnterior: string,
  nomeAtual: string,
): RequisitoEvolucao | undefined {
  const requisito = EVOLUCOES_GO[nomeAnterior]?.find(
    (r) => r.para === nomeAtual,
  );

  if (!requisito) {
    return undefined;
  }

  return {
    doces: requisito.doces,
    item: requisito.item,
    quest: requisito.quest,
  };
}

function construirNo(
  no: NoEvolucaoApi,
  nomeAnterior?: string,
): EvolucaoReferencia {
  const nome = no.species.name;

  return {
    nome,
    numero: `#${idDaEspecie(no.species.url).padStart(3, "0")}`,
    imagem: imagemDaEspecie(no.species.url),
    proximas: no.evolves_to.map((proxima) =>
      construirNo(proxima, nome),
    ),
    requisito: nomeAnterior
      ? requisitoDoGO(nomeAnterior, nome)
      : undefined,
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
  cadeiaEvolutiva: CadeiaEvolutivaApi,
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
