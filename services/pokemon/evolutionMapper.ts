import type { EvolucaoPokemon } from "@/models/pokemonOficial";

type EvolChainNode = {
  species: { name: string };
  evolves_to: EvolChainNode[];
};

export function obterEvolucaoPokemon(
  cadeiaEvolutiva: { chain: EvolChainNode },
  nomePokemon: string,
): EvolucaoPokemon {
  const linhaEvolutiva: string[] = [];

  function percorrer(no: EvolChainNode) {
    linhaEvolutiva.push(no.species.name);

    for (const evolucao of no.evolves_to) {
      percorrer(evolucao);
    }
  }

  percorrer(cadeiaEvolutiva.chain);

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