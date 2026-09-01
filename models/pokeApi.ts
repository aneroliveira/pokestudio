// =========================
// Respostas da PokéAPI
// =========================
//
// Só os campos que o código realmente consome, não o schema completo da API.
// O objetivo é tirar o `any` dos mappers: a PokéAPI devolve `any` por
// `response.json()`, e sem isto um campo renomeado lá só apareceria como
// erro em runtime, no meio do card.
//
// Se um campo novo passar a ser usado, acrescente aqui em vez de alargar o
// tipo com `any` — é essa a fronteira entre o dado externo e o domínio.

/** Par `{ name, url }`, o formato de referência padrão da PokéAPI. */
export interface RecursoApi {
  name: string;
  url: string;
}

/** Um nome localizado em `species.names`. */
export interface NomeLocalizadoApi {
  name: string;
  language: RecursoApi;
}

/** Uma variedade (forma) em `species.varieties`. */
export interface VariedadeApi {
  pokemon: RecursoApi;
  is_default?: boolean;
}

/** Resposta de `/pokemon/{nome}`. */
export interface PokemonApi {
  id: number;
  name: string;
  is_default: boolean;
  species: RecursoApi;
  types: { type: RecursoApi }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
}

/** Resposta de `/pokemon-species/{id}`. */
export interface EspecieApi {
  name: string;
  names: NomeLocalizadoApi[];
  varieties: VariedadeApi[];
  evolution_chain: { url: string };
}

/**
 * Nó da cadeia evolutiva. Recursivo: cada nó aponta para os seguintes,
 * e uma espécie pode ter mais de uma evolução (Eevee é o caso extremo).
 */
export interface NoEvolucaoApi {
  species: RecursoApi;
  evolves_to: NoEvolucaoApi[];
}

/** Resposta de `/evolution-chain/{id}`. */
export interface CadeiaEvolutivaApi {
  chain: NoEvolucaoApi;
}
