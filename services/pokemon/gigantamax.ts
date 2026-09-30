import gigantamaxData from "@/data/gigantamax.json";

/**
 * Uma espécie com forma Gigantamax no GO (data/gigantamax.json, gerado por
 * scripts/gerarGigantamax.ts). Dado oficial/externo — RFC-006/RFC-002.
 */
export interface EntradaGigantamax {
  numeroBase: string;
  nome: string;
  imagem?: string;
  imagemShiny?: string;
  /** Compensa a margem do ícone do GO em relação à arte oficial da forma
   *  base — aplicar como transform: scale() na UI. */
  escala?: number;
}

export const GIGANTAMAX = gigantamaxData as EntradaGigantamax[];
