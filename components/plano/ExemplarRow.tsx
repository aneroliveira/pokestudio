import Image from "next/image";
import Link from "next/link";

import { TypeIcon } from "@/components/ui/TypeIcon";
import { EtiquetaChip } from "@/components/plano/EtiquetaChip";
import type { ExemplarPlano } from "@/models/plano";
import { obterSpritePokemon, idDoNumero } from "@/utils";

type ExemplarRowProps = {
  exemplar: ExemplarPlano;
};

/**
 * Uma linha de Pokémon dentro de um bloco do plano. Leva para a Home já
 * com o card aberto (`/?p=<slug>`), que é o pulo do gato: o plano diz o
 * que fazer, o card diz por quê.
 */
export function ExemplarRow({ exemplar }: ExemplarRowProps) {
  const { numero, nomeEn, nome, detalhe, pc, cobre, etiqueta, nota, status } =
    exemplar;

  return (
    <Link
      href={`/?p=${nomeEn}`}
      className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-accent"
    >
      <Image
        src={obterSpritePokemon(idDoNumero(numero))}
        alt=""
        width={48}
        height={48}
        className="shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">
          {nome}
          {detalhe && (
            <span className="ml-1.5 text-sm font-normal text-muted-foreground">
              {detalhe}
            </span>
          )}
        </p>

        {nota && (
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {nota}
          </p>
        )}

        {(etiqueta || cobre?.length) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {cobre?.map((tipo) => (
              <TypeIcon key={tipo} tipo={tipo} compact mostrarNome />
            ))}
            {etiqueta && <EtiquetaChip etiqueta={etiqueta} />}
          </div>
        )}
      </div>

      <div className="shrink-0 text-right">
        {pc !== undefined && (
          <p className="text-lg font-bold leading-tight">{pc}</p>
        )}
        {status && (
          <p className="mt-0.5 max-w-[9rem] text-xs leading-snug text-muted-foreground">
            {status}
          </p>
        )}
      </div>
    </Link>
  );
}
