import type { TipoPokemon } from "./pokemon";
import type { TemaEvento } from "@/constants/eventoTemas";

// =========================
// Domínio Evento (eventos temporários do jogo)
// =========================
//
// Cada evento (Community Day, fim de semana de reide, festival sazonal...)
// vira um objeto Evento em data/eventos/. Toda seção de conteúdo é opcional
// porque eventos diferentes trazem combinações diferentes — um Community
// Day normalmente não tem `reides`, por exemplo.

export interface JanelaBonus {
  /** Rótulo livre da janela (ex.: "18/08 (ter) 10h → 20/08 (qui) 10h"). */
  janela: string;
  xp: string;
  poeira: string;
  /** Marca a janela de maior multiplicador, destacada na tabela. */
  pico?: boolean;
}

export interface EstreiaEvento {
  nome: string;
  tipos: TipoPokemon[];
  origem: string;
}

export interface EncontroEvento {
  nome: string;
  tipos: TipoPokemon[];
  nota: string;
  shiny?: boolean;
}

export interface ChefeReideEvento {
  nome: string;
  tipos: TipoPokemon[];
  /**
   * Imagem e CP curados manualmente — só pra chefes que NÃO são uma Mega
   * (então não têm entrada em data/megas.json pra derivar isso em runtime,
   * ex.: Mewtwo de Armadura). Quando `nome` bate com uma Mega, o componente
   * ignora esses campos e deriva tudo do roster (RFC-002).
   */
  imagem?: string;
  /** Fator de escala pra compensar a moldura do ícone (mesmo cálculo do
   *  roster de Megas — ver scripts/gerarMegas.ts) — só relevante junto de
   *  `imagem` custom, já que Megas derivam a própria escala do roster. */
  escala?: number;
  cpSemClima?: number;
  cpComClima?: number;
}

export interface GrupoReideEvento {
  nivel: string;
  chefes: ChefeReideEvento[];
}

export interface DiaGradeMega {
  /** Rótulo da aba (ex.: "Sábado 05/09"). */
  rotulo: string;
  grupos: GrupoHorarioMega[];
}

export interface GrupoHorarioMega {
  /** Rótulo livre do horário (ex.: "10h–11h e 14h–15h") — sem o dia, que já
   *  fica implícito na aba selecionada. */
  horario: string;
  /** Rótulo do habitat/tema da janela, quando o evento nomeia (opcional). */
  habitat?: string;
  /**
   * Nomes batendo exatamente com `EntradaMega.nome` em data/megas.json (ex.:
   * "Mega Beedrill") — imagem, tipos e CP são derivados de lá em runtime,
   * nunca duplicados aqui (RFC-002).
   */
  megas: string[];
}

export interface Evento {
  slug: string;
  titulo: string;
  /**
   * Datas reais em ISO com offset explícito (ex.: "2026-08-18T10:00:00-03:00").
   * Usadas só para calcular o estado do evento — a Vercel roda em UTC, e um
   * ISO sem offset dá resultado inconsistente entre servidor e cliente.
   */
  periodo: {
    inicio: string;
    fim: string;
  };
  /** Texto curado do período, exibido como subtítulo no hero e na listagem —
   *  não deriva de `periodo` (a curadoria segue a redação oficial do
   *  evento, não um formato genérico de data). */
  periodoTexto: string;
  /** Chave do preset visual em constants/eventoTemas.ts. Cada evento tem o
   *  seu — o registro existe pela limitação do Tailwind (não dá pra montar
   *  classe de cor em runtime), não como convite a reaproveitar visual. */
  tema: TemaEvento;
  /** Texto do selo de destaque no hero (ex.: "Pico de 5× Poeira Estelar"). */
  badge?: string;
  estreias?: {
    lista: EstreiaEvento[];
    dica?: string;
  };
  bonusPoeira?: {
    janelas: JanelaBonus[];
    dica?: string;
  };
  encontros?: EncontroEvento[];
  reides?: GrupoReideEvento[];
  /** Grade de Mega Raids por horário (habitats rotativos), separada por
   *  dia em abas — quando o evento tem agenda hora a hora, além (ou em
   *  vez) do resumo em `reides`. */
  gradeMegaRaids?: {
    titulo: string;
    dias: DiaGradeMega[];
  };
  notaCuradoria?: {
    texto: string;
    /** Quando true, mostra o link "Ver o plano completo" para a aba
     *  "Plano" em /admin. */
    linkPlano?: boolean;
  };
}
