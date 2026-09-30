"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { GIGANTAMAX } from "@/services/pokemon/gigantamax";
import { idDoNumero } from "@/utils/obterImagemPokemon";

export interface ImagemExibida {
  key: string;
  src?: string;
  alt: string;
  /** "X"/"Y" — só quando o Pokémon tem as duas variantes, pra diferenciar
   *  as imagens lado a lado (ex.: Mewtwo, Charizard). */
  legenda?: string;
  /** Compensa o ícone da forma (Mega/Gigamax) ter menos preenchimento que
   *  a arte oficial da forma base — aplicar como transform: scale() no <Image>. */
  escala?: number;
}

/** Extrai a variante (X/Y) do id da Mega (ex.: "MEWTWO_MEGA_X" → "X"). */
function obterVarianteMega(id: string): string | undefined {
  const match = id.match(/_(X|Y)$/);
  return match?.[1];
}

/**
 * Estado dos toggles Shiny/Mega/Gigamax e as imagens resultantes —
 * compartilhado entre PokemonHeader (ficha completa) e PokemonPocketCard
 * (ficha rápida), pra não duplicar os filtros de forma nem as combinações
 * nos dois. Shiny combina com qualquer forma; Mega e Gigamax não existem
 * juntas, então ligar uma desliga a outra.
 */
export function useFormasVisuais(pokemon: Pokemon) {
  const [mostrarShiny, setMostrarShiny] = useState(false);
  const [mostrarMega, setMostrarMegaInterno] = useState(false);
  const [mostrarGigamax, setMostrarGigamaxInterno] = useState(false);

  function alternarShiny() {
    setMostrarShiny((valor) => !valor);
  }

  function alternarMega() {
    setMostrarMegaInterno((valor) => !valor);
    setMostrarGigamaxInterno(false);
  }

  function alternarGigamax() {
    setMostrarGigamaxInterno((valor) => !valor);
    setMostrarMegaInterno(false);
  }

  const temShiny = Boolean(pokemon.oficial.imagemShiny);
  const id = pokemon.oficial.numero ? idDoNumero(pokemon.oficial.numero) : undefined;

  const megasDoPokemon = id
    ? MEGAS.filter((mega) => idDoNumero(mega.numeroBase) === id)
    : [];
  const temMega = megasDoPokemon.length > 0;

  const gigamax = id
    ? GIGANTAMAX.find((item) => idDoNumero(item.numeroBase) === id)
    : undefined;
  const temGigamax = Boolean(gigamax?.imagem);

  const nome = pokemon.oficial.nome.ptBR || "Pokémon";

  let imagensExibidas: ImagemExibida[];

  if (mostrarMega && temMega) {
    imagensExibidas = megasDoPokemon.map((mega) => ({
      key: mega.id,
      src: mostrarShiny && mega.imagemShiny ? mega.imagemShiny : mega.imagem,
      alt: mega.nome,
      legenda:
        megasDoPokemon.length > 1 ? obterVarianteMega(mega.id) : undefined,
      escala: mega.escala,
    }));
  } else if (mostrarGigamax && gigamax && temGigamax) {
    imagensExibidas = [
      {
        key: "gigamax",
        src:
          mostrarShiny && gigamax.imagemShiny
            ? gigamax.imagemShiny
            : gigamax.imagem,
        alt: `${nome} Gigamax`,
        escala: gigamax.escala,
      },
    ];
  } else {
    imagensExibidas = [
      {
        key: "base",
        src:
          mostrarShiny && temShiny
            ? pokemon.oficial.imagemShiny
            : pokemon.oficial.imagem,
        alt: nome,
      },
    ];
  }

  return {
    mostrarShiny,
    alternarShiny,
    mostrarMega,
    alternarMega,
    mostrarGigamax,
    alternarGigamax,
    temShiny,
    temMega,
    temGigamax,
    imagensExibidas,
  };
}
