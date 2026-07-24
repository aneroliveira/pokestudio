import type { TipoPokemon } from "@/models/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { obterIconeTipo } from "@/constants/typeIcons";
import { Tooltip } from "@/components/ui/Tooltip";

type TypeIconProps = {
  tipo: TipoPokemon;
  /** Classe de fundo do círculo (ex.: bg-good, bg-bad, bg-secondary). */
  className?: string;
  /** Tamanho reduzido, para caber ao lado de outros elementos. */
  compact?: boolean;
};

/**
 * Ícone de tipo (badge real do jogo) com tooltip mostrando o nome —
 * sem rótulo de texto visível. Fonte: mirror ZeChrales/PogoAssets.
 *
 * Renderizado como background-image (não <img>) de propósito: um <img>
 * segurado no celular aciona o menu nativo de "salvar/copiar imagem",
 * que rouba o toque antes do nosso tooltip abrir. Sem elemento <img>,
 * esse menu nunca aparece.
 */
export function TypeIcon({ tipo, className = "", compact = false }: TypeIconProps) {
  const wrapper = compact ? "h-7 w-7" : "h-9 w-9";
  const imagem = compact ? 18 : 24;

  return (
    <Tooltip content={TIPO_LABEL[tipo]}>
      <span
        className={`flex items-center justify-center rounded-full p-1 ${wrapper} ${className}`}
      >
        <span
          role="img"
          aria-label={TIPO_LABEL[tipo]}
          className="select-none [-webkit-touch-callout:none]"
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
    </Tooltip>
  );
}
