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
   * ícone está aberto (ex.: "só um nome por vez"). Sem ele, o ícone usa
   * estado próprio e abre/fecha de forma independente. Ignorado quando
   * `mostrarNome` está ligado.
   */
  aberto?: boolean;
  onToggle?: () => void;
  /**
   * Nome sempre visível ao lado do ícone (rótulo estático, não clicável).
   * Usado no Combate, onde os tipos já vêm com o nome à mostra.
   */
  mostrarNome?: boolean;
};

/**
 * Ícone de tipo (badge real do jogo). Por padrão revela o nome ao ser
 * tocado — inline, ali mesmo, em vez de um tooltip por hover. Com
 * `mostrarNome`, o nome fica sempre visível (rótulo estático).
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
  mostrarNome = false,
}: TypeIconProps) {
  const [abertoLocal, setAbertoLocal] = useState(false);
  const nome = TIPO_LABEL[tipo];
  const circulo = compact ? "h-7 w-7" : "h-9 w-9";
  const imagem = compact ? 18 : 24;

  const badge = (
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
  );

  // Nome sempre visível: rótulo estático, sem interação.
  if (mostrarNome) {
    return (
      <span className="inline-flex items-center gap-1.5" title={nome}>
        {badge}
        <span className="pr-1 text-xs font-medium leading-none">{nome}</span>
      </span>
    );
  }

  const controlado = onToggle !== undefined;
  const estaAberto = controlado ? Boolean(aberto) : abertoLocal;
  const alternar = controlado ? onToggle : () => setAbertoLocal((v) => !v);

  return (
    <button
      type="button"
      onClick={alternar}
      aria-expanded={estaAberto}
      aria-label={nome}
      title={nome}
      className="inline-flex select-none items-center gap-1.5 [-webkit-touch-callout:none]"
    >
      {badge}

      {estaAberto && (
        <span className="pr-1 text-xs font-medium leading-none">{nome}</span>
      )}
    </button>
  );
}
