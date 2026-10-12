/** Termo pronto da busca do Pokémon GO — vai pra área de transferência
 *  exatamente como está em `termo`. */
export type TermoFiltro = {
  tipo: "termo";
  termo: string;
  descricao: string;
};

/** Termo que precisa de um valor (nome de tag, faixa de PC, tipo do golpe...)
 *  — a tela mostra um campo e `montar` gera o texto final. Devolve `null`
 *  enquanto o valor ainda não forma um termo válido. */
export type ModeloFiltro =
  | {
      tipo: "texto";
      id: string;
      rotulo: string;
      descricao: string;
      placeholder: string;
      montar: (valor: string) => string | null;
    }
  | {
      tipo: "faixa";
      id: string;
      rotulo: string;
      descricao: string;
      /** Limites do campo numérico (ex.: 0–4 nas barras de avaliação). */
      minimo?: number;
      maximo?: number;
      montar: (faixa: string) => string;
    }
  | {
      tipo: "opcao";
      id: string;
      rotulo: string;
      descricao: string;
      opcoes: readonly string[];
      montar: (opcao: string) => string;
    };

export type ItemFiltro = TermoFiltro | ModeloFiltro;

export type CategoriaFiltro = {
  id: string;
  titulo: string;
  itens: ItemFiltro[];
};
