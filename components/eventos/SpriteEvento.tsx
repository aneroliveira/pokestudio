"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { EspeciePokemon } from "@/services/eventos/especiePokemon";

const GO_ASSETS = "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon";
const POKEAPI = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/** Ícone do próprio Pokémon GO (mesmo CDN das reides), com a forma regional
 *  quando tem. Espécie nova que o CDN ainda não tem cai no sprite da
 *  PokeAPI. A troca pra brilhante fica pro card da Pokédex/Home. */
function urlSprite(especie: EspeciePokemon, fonte: "go" | "pokeapi") {
  if (fonte === "pokeapi") return `${POKEAPI}/${especie.id}.png`;
  const forma = especie.forma ? `.f${especie.forma}` : "";
  return `${GO_ASSETS}/pm${especie.id}${forma}.icon.png`;
}

type SpriteEventoProps = {
  especie: EspeciePokemon;
};

/** Sprite redondo na frente do nome, nas listas de estreias e encontros. */
export function SpriteEvento({ especie }: SpriteEventoProps) {
  const [fonte, setFonte] = useState<"go" | "pokeapi">("go");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A imagem vem no HTML do servidor — se o 404 do CDN chegar antes da
    // hidratação, o onError do React nunca dispara. Confere na montagem.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFonte("pokeapi");
  }, []);

  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary"
    >
      {/* <img> comum, não next/image — precisa do onError pra cair do CDN
          do GO na PokeAPI, e são ícones pequenos. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={urlSprite(especie, fonte)}
        alt=""
        loading="lazy"
        width={40}
        height={40}
        onError={() => setFonte((atual) => (atual === "go" ? "pokeapi" : atual))}
        className={cn("h-10 w-10 object-contain", fonte === "pokeapi" && "scale-[1.4]")}
      />
    </span>
  );
}
