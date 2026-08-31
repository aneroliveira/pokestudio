"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { idDoNumero } from "@/utils/obterImagemPokemon";

export interface ImagemExibida {
  key: string;
  src?: string;
  alt: string;
  /** "X"/"Y" — só quando o Pokémon tem as duas variantes, pra diferenciar
   *  as imagens lado a lado (ex.: Mewtwo, Charizard). */
  legenda?: string;
  /** Compensa o ícone de Mega ter menos preenchimento que a arte oficial
   *  da forma base — aplicar como transform: scale() no <Image>. */
  escala?: number;
}

/** Extrai a variante (X/Y) do id da Mega (ex.: "MEWTWO_MEGA_X" → "X"). */
function obterVarianteMega(id: string): string | undefined {
  const match = id.match(/_(X|Y)$/);
  return match?.[1];
}

/**
 * Estado dos toggles Shiny/Mega e as imagens resultantes — compartilhado
 * entre PokemonHeader (ficha completa) e PokemonPocketCard (/pocket), pra
 * não duplicar o filtro de MEGAS nem a combinação Shiny×Mega nos dois.
 */
export function useMegaShiny(pokemon: Pokemon) {
  const [mostrarShiny, setMostrarShiny] = useState(false);
  const [mostrarMega, setMostrarMega] = useState(false);

  const temShiny = Boolean(pokemon.oficial.imagemShiny);

  const megasDoPokemon = pokemon.oficial.numero
    ? MEGAS.filter(
        (mega) =>
          idDoNumero(mega.numeroBase) === idDoNumero(pokemon.oficial.numero),
      )
    : [];
  const temMega = megasDoPokemon.length > 0;

  const imagensExibidas: ImagemExibida[] =
    mostrarMega && temMega
      ? megasDoPokemon.map((mega) => ({
          key: mega.id,
          src:
            mostrarShiny && mega.imagemShiny ? mega.imagemShiny : mega.imagem,
          alt: mega.nome,
          legenda:
            megasDoPokemon.length > 1
              ? obterVarianteMega(mega.id)
              : undefined,
          escala: mega.escala,
        }))
      : [
          {
            key: "base",
            src:
              mostrarShiny && temShiny
                ? pokemon.oficial.imagemShiny
                : pokemon.oficial.imagem,
            alt: pokemon.oficial.nome.ptBR || "Pokémon",
          },
        ];

  return {
    mostrarShiny,
    setMostrarShiny,
    mostrarMega,
    setMostrarMega,
    temShiny,
    temMega,
    imagensExibidas,
  };
}
