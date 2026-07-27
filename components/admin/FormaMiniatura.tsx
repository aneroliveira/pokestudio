"use client";

import Image from "next/image";
import { useState } from "react";

type FormaMiniaturaProps = {
  src: string;
  alt: string;
};

// Sprites de algumas variedades (ex.: pikachu-starter) não existem no
// repositório da PokéAPI e retornam 404. Nesse caso caímos no mesmo
// placeholder tracejado usado quando não há sprite algum.
export function FormaMiniatura({ src, alt }: FormaMiniaturaProps) {
  const [falhou, setFalhou] = useState(false);

  if (!src || falhou) {
    return (
      <span
        title={alt}
        className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted p-1 text-center text-[8px] leading-tight text-muted-foreground"
      >
        <span className="line-clamp-3 break-words">{alt}</span>
      </span>
    );
  }

  return (
    <span className="flex h-[43px] w-[43px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted p-px">
      <Image
        src={src}
        alt={alt}
        width={43}
        height={43}
        className="h-full w-full scale-[1.3] object-contain"
        unoptimized
        onError={() => setFalhou(true)}
      />
    </span>
  );
}
