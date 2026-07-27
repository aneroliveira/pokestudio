"use client";

import { useState } from "react";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { obterIconeTipo } from "@/constants/typeIcons";

type TypeIconProps = {
  tipo: TipoPokemon;
  /** Classe de fundo do círculo (ex.: bg-good, bg-bad, bg-secondary). */
  className?: string;
  /** Tamanho reduzido, para caber ao lado de outros elementos. */
  compact?: boolean;
  /**
   * Modo controlado: quando `onToggle` é passado, o pai gerencia qual
   * ícone está aberto (ex.: Combate, "só um nome por vez"). Sem ele, o
   * ícone usa estado próprio e abre/fecha de forma independente.
   */
  aberto?: boolean;
  onToggle?: () => void;
};

/**
 * Ícone de tipo (badge real do jogo) que revela o nome ao ser tocado —
 * inline, ali mesmo, em vez de um tooltip por hover. Toca (ou clica) no
 * ícone e o nome aparece ao lado; toca de novo e recolhe. Funciona igual
 * no desktop e no celular, sem depender de passar o mouse.
 *
 * O badge é renderizado como background-image (não <img>) de propósito:
 * um <img> segurado no celular aciona o menu nativo de "salvar/copiar
 * imagem", que rouba o toque. Sem elemento <img>, esse menu nunca aparece.
 *
 * Fonte do badge: mirror ZeChrales/PogoAssets.
 */
export function TypeIcon({
  tipo,
  className = "",
  compact = false,
  aberto,
  onToggle,
}: TypeIconProps) {
  const [abertoLocal, setAbertoLocal] = useState(false);
  const controlado = onToggle !== undefined;
  const estaAberto = controlado ? Boolean(aberto) : abertoLocal;
  const alternar = controlado
    ? onToggle
    : () => setAbertoLocal((v) => !v);

  const nome = TIPO_LABEL[tipo];
  const circulo = compact ? "h-7 w-7" : "h-9 w-9";
  const imagem = compact ? 18 : 24;

  return (
    <button
      type="button"
      onClick={alternar}
      aria-expanded={estaAberto}
      aria-label={nome}
      title={nome}
      className="inline-flex select-none items-center gap-1.5 [-webkit-touch-callout:none]"
    >
      <span
        className={`flex items-center justify-center rounded-full p-1 ${circulo} ${className}`}
      >
        <span
          role="img"
          aria-hidden
          className="select-none"
          style={{
            width: imagem,
            height: imagem,
            backgroundImage: `url(${obterIconeTipo(tipo)})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </span>

      {estaAberto && (
        <span className="pr-1 text-xs font-medium leading-none">{nome}</span>
      )}
    </button>
  );
}
