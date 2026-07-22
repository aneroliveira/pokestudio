import type { EvolucaoPokemon } from "@/models/pokemonOficial";

type EvolChainNode = {
  species: { name: string };
  evolves_to: EvolChainNode[];
};

function hasChain(obj: unknown): obj is { chain: EvolChainNode } {
  return typeof obj === 'object' && obj !== null && 'chain' in (obj as object);
}

export function obterEvolucaoPokemon(
  cadeiaEvolutiva: unknown,
  nomePokemon: string,
): EvolucaoPokemon {
  const linhaEvolutiva: string[] = [];

  const root: EvolChainNode = hasChain(cadeiaEvolutiva)
    ? (cadeiaEvolutiva as { chain: EvolChainNode }).chain
    : (cadeiaEvolutiva as EvolChainNode);

  function percorrer(no: EvolChainNode) {
    linhaEvolutiva.push(no.species.name);

    for (const evolucao of no.evolves_to) {
      percorrer(evolucao);
    }
  }

  percorrer(root);

  const indiceAtual = linhaEvolutiva.findIndex(
    (nome) => nome === nomePokemon,
  );

  return {
    anteriores:
      indiceAtual > 0
        ? [
            {
              nome: linhaEvolutiva[indiceAtual - 1],
            },
          ]
        : [],

    proximas:
      indiceAtual >= 0 &&
      indiceAtual < linhaEvolutiva.length - 1
        ? linhaEvolutiva
            .slice(indiceAtual + 1)
            .map((nome) => ({
              nome,
            }))
        : [],
  };
}