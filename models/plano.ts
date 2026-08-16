import type { TipoPokemon } from "./pokemon";

// =========================
// Domínio Plano (curadoria de coleção)
// =========================
//
// O domínio Studio descreve UM Pokémon ("vale investir nesse?"). O Plano
// descreve a COLEÇÃO inteira ("o que eu faço primeiro?") — auditoria de
// bolsa, ordem de execução, orçamento de poeira e etiquetas de raide.
//
// Nada aqui é indexado por número, ao contrário do Studio: a mesma espécie
// aparece em papéis diferentes (o Tyranitar sortudo carrega a mega, o
// Tyranitar 3 Stars é o atacante de linha) e cada papel tem destino próprio.

/** Situação de um tipo dentro da coleção, do melhor para o pior. */
export type StatusTipo =
  | "excelente"
  | "pronto"
  | "ok"
  | "subnivelado"
  | "magro"
  | "baixa"
  | "buraco";

/**
 * Um exemplar dentro do plano. `numero` e `nomeEn` vêm do índice da
 * PokéAPI e servem para o sprite e para o link até o card na busca;
 * `nome` é o rótulo do papel dele no plano (ex.: "Mewtwo X"), que
 * propositalmente não é o nome canônico da espécie.
 */
export interface ExemplarPlano {
  numero: string;
  nomeEn: string;
  nome: string;
  /** Qualificador do exemplar: "sortudo", "3 Stars", "IV 100%", "×7". */
  detalhe?: string;
  pc?: number;
  /** Tipo que ESTE exemplar cobre no plano — não a tipagem da espécie. */
  cobre?: TipoPokemon[];
  etiqueta?: string;
  /** Coluna livre da tabela de origem ("Por quê", "Situação", "Moveset"). */
  nota?: string;
  /** Veredito curto exibido à direita ("✅ alvo exato", "Manter 2"). */
  status?: string;
}

export interface MovesetAlvo {
  pokemon: string;
  rapido: string;
  carregado: string;
  observacao?: string;
}

/** Um bloco da auditoria (Bloco 0 a Bloco 5). */
export interface BlocoPlano {
  id: string;
  titulo: string;
  resumo?: string;
  concluido?: boolean;
  exemplares: ExemplarPlano[];
  /** Prosa do bloco: correções, ressalvas, regras. */
  notas?: string[];
  /** Blocos longos (o 4) trazem regras agrupadas por assunto. */
  subsecoes?: { titulo: string; itens: string[] }[];
  /** Tabela de movesets-alvo, quando o bloco tiver uma. */
  movesets?: MovesetAlvo[];
}

export interface EstadoTipo {
  tipo: TipoPokemon;
  status: StatusTipo;
  titular: string;
  /** Ausente quando o tipo não recebe etiqueta (ex.: Psíquico, por opção). */
  etiqueta?: string;
  reservas?: string[];
}

/** Item da ordem de execução. `concluido` é o único campo mutável do plano. */
export interface PassoPlano {
  id: string;
  titulo: string;
  detalhe?: string;
  concluido: boolean;
}

export interface BloqueioPlano {
  titulo: string;
  motivo: string;
}

/** Um tipo de chefe e as etiquetas que respondem a ele. */
export interface CounterChefe {
  tipoChefe: TipoPokemon;
  usar: {
    tipo: TipoPokemon;
    /** Ausente quando não existe etiqueta para o tipo (ex.: Venenoso). */
    etiqueta?: string;
    nota?: string;
  }[];
}

/** Caso em que a tipagem da espécie engana sobre o papel dela. */
export interface ArmadilhaTipo {
  pokemon: string;
  parece: string;
  ehNaVerdade: string;
  motivo: string;
}

export interface Plano {
  meta: {
    titulo: string;
    subtitulo: string;
    data: string;
    tiposVarridos: number;
    poeiraEstelar: number;
    gargalo: string;
  };
  blocos: BlocoPlano[];
  estadoPorTipo: EstadoTipo[];
  ordemExecucao: PassoPlano[];
  bloqueios: BloqueioPlano[];
  etiquetas: {
    prefixo: string;
    lista: string[];
    excecao: string;
    conferencia: string;
    comoUsar: { titulo: string; corpo: string; exemplo?: string }[];
    manutencao: string[];
  };
  countersPorChefe: CounterChefe[];
  armadilhas: {
    licoes: { titulo: string; corpo: string }[];
    tiposEnganosos: ArmadilhaTipo[];
  };
  glossario: { ptbr: string; en: string }[];
  buscas: { sintaxe: string; descricao: string }[];
  diagnostico: string;
}
