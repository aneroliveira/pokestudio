import type { Pokemon } from "@/models/pokemon";

/**
 * Indica se uma aba do Admin já possui dados de curadoria/sincronização,
 * para exibir um indicador visual nas abas (Tabs.tsx).
 */
export function abaPossuiDados(
  pokemon: Pokemon,
  aba: string,
): boolean {
  switch (aba) {
    case "Geral":
    case "Oficial":
      return pokemon.oficial.numero !== "";

    case "Forms":
      return pokemon.oficial.formas.length > 0;

    case "GO": {
      const { estado, shadow, buddy, hundos } = pokemon.studio.go;
      return (
        estado.tipo !== "Nenhum" ||
        shadow.possuiShadow ||
        buddy.necessario ||
        hundos.semClima > 0 ||
        hundos.comClima > 0
      );
    }

    case "Estratégia": {
      const { estrategia, conhecimento } = pokemon.studio;
      return (
        estrategia.melhorPara.length > 0 ||
        conhecimento.decisoes.length > 0 ||
        conhecimento.observacoes.length > 0 ||
        conhecimento.sinergias.length > 0
      );
    }

    default:
      return false;
  }
}
