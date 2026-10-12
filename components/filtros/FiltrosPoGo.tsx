"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CATEGORIAS_FILTRO, OPERADORES_FILTRO } from "@/data/filtrosGO";
import type { ModeloFiltro, TermoFiltro } from "@/models/filtroGO";

/** Atalhos do menu lateral — a colinha de operadores e cada categoria. */
const SECOES = [
  { id: "como-combinar", titulo: "Como combinar" },
  ...CATEGORIAS_FILTRO.map(({ id, titulo }) => ({ id, titulo })),
];

type Conector = "&" | ",";

type Clausula = {
  id: number;
  termo: string;
  negado: boolean;
  /** Como liga com a cláusula anterior — ignorado na primeira. */
  conector: Conector;
};

/** No jogo o `,` (ou) amarra mais forte que o `&` (e): `fogo,água&4*` é
 *  "(fogo ou água) e 4*". Juntar na ordem já dá o agrupamento intuitivo,
 *  então não precisa de parênteses (que a busca nem aceita). */
function montarBusca(clausulas: Clausula[]) {
  return clausulas
    .map(
      (c, i) => (i > 0 ? c.conector : "") + (c.negado ? "!" : "") + c.termo,
    )
    .join("");
}

/** "de"/"até" → trecho de faixa do jogo: `10-20`, `10-`, `-20` ou `10`. */
function montarFaixa(de: string, ate: string) {
  const a = de.trim();
  const b = ate.trim();
  if (a && b) return a === b ? a : `${a}-${b}`;
  if (a) return `${a}-`;
  if (b) return `-${b}`;
  return null;
}

/** Um "Copiado!" de cada vez — copiar outra coisa troca o destaque. */
function useCopiar() {
  const [copiado, setCopiado] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  async function copiar(texto: string, chave: string) {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Sem permissão de área de transferência não tem o que fazer além
      // de não mostrar o "Copiado!" — o texto continua visível pra copiar
      // na mão.
      return;
    }
    setCopiado(chave);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopiado(null), 1500);
  }

  return { copiado, copiar };
}

type AcoesTermo = {
  onAdicionar: (termo: string) => void;
  onCopiar: (termo: string, chave: string) => void;
  copiado: string | null;
};

function BotaoCopiar({
  texto,
  chave,
  onCopiar,
  copiado,
  className,
}: {
  texto: string | null;
  chave: string;
  onCopiar: AcoesTermo["onCopiar"];
  copiado: string | null;
  className?: string;
}) {
  const feito = copiado === chave;

  return (
    <button
      type="button"
      disabled={!texto}
      onClick={() => texto && onCopiar(texto, chave)}
      aria-label={texto ? `Copiar ${texto}` : "Copiar"}
      title={feito ? "Copiado!" : "Copiar"}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition disabled:opacity-40",
        feito
          ? "text-success"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {feito ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function BotaoAdicionar({
  texto,
  onAdicionar,
}: {
  texto: string | null;
  onAdicionar: AcoesTermo["onAdicionar"];
}) {
  return (
    <button
      type="button"
      disabled={!texto}
      onClick={() => texto && onAdicionar(texto)}
      aria-label={texto ? `Adicionar ${texto} ao montador` : "Adicionar ao montador"}
      title="Adicionar ao montador"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-40"
    >
      <Plus className="h-4 w-4" />
    </button>
  );
}

function CartaoTermo({
  item,
  onAdicionar,
  onCopiar,
  copiado,
}: { item: TermoFiltro } & AcoesTermo) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card py-1 pl-1 pr-1">
      {/* O cartão inteiro adiciona ao montador — é o gesto mais comum;
          copiar sozinho fica no ícone do lado. */}
      <button
        type="button"
        onClick={() => onAdicionar(item.termo)}
        title="Adicionar ao montador"
        className="min-w-0 flex-1 rounded-md px-2 py-1 text-left transition hover:bg-accent"
      >
        <code className="block break-all font-mono text-sm font-semibold text-foreground">
          {item.termo}
        </code>
        {item.descricao && (
          <span className="block text-xs leading-snug text-muted-foreground">
            {item.descricao}
          </span>
        )}
      </button>
      <BotaoCopiar
        texto={item.termo}
        chave={`termo:${item.termo}`}
        onCopiar={onCopiar}
        copiado={copiado}
      />
    </div>
  );
}

function CartaoModelo({
  item,
  onAdicionar,
  onCopiar,
  copiado,
}: { item: ModeloFiltro } & AcoesTermo) {
  const [texto, setTexto] = useState("");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [opcao, setOpcao] = useState(
    item.tipo === "opcao" ? item.opcoes[0] : "",
  );

  let resultado: string | null = null;
  if (item.tipo === "texto") {
    resultado = item.montar(texto);
  } else if (item.tipo === "faixa") {
    const faixa = montarFaixa(de, ate);
    resultado = faixa ? item.montar(faixa) : null;
  } else {
    resultado = item.montar(opcao);
  }

  const campoNumero = "h-8 w-20 rounded-md px-2 text-sm";

  return (
    <div className="col-span-full space-y-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-baseline justify-between gap-2">
        <code className="font-mono text-sm font-semibold">{item.rotulo}</code>
        <span className="text-right text-xs text-muted-foreground">
          {item.descricao}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {item.tipo === "texto" && (
          <Input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && resultado) onAdicionar(resultado);
            }}
            placeholder={item.placeholder}
            aria-label={item.descricao}
            className="h-8 w-40 rounded-md px-2 text-sm"
          />
        )}

        {item.tipo === "faixa" && (
          <>
            <Input
              type="number"
              inputMode="numeric"
              min={item.minimo}
              max={item.maximo}
              value={de}
              onChange={(e) => setDe(e.target.value)}
              placeholder="de"
              aria-label={`${item.descricao} — de`}
              className={campoNumero}
            />
            <span className="text-xs text-muted-foreground">até</span>
            <Input
              type="number"
              inputMode="numeric"
              min={item.minimo}
              max={item.maximo}
              value={ate}
              onChange={(e) => setAte(e.target.value)}
              placeholder="até"
              aria-label={`${item.descricao} — até`}
              className={campoNumero}
            />
          </>
        )}

        {item.tipo === "opcao" && (
          <select
            value={opcao}
            onChange={(e) => setOpcao(e.target.value)}
            aria-label={item.descricao}
            className="h-8 rounded-md border border-transparent bg-input/50 px-2 text-sm outline-none focus-visible:border-ring"
          >
            {item.opcoes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        <div className="ml-auto flex items-center gap-1">
          <code
            className={cn(
              "rounded bg-muted px-2 py-1 font-mono text-sm",
              !resultado && "text-muted-foreground",
            )}
          >
            {resultado ?? "…"}
          </code>
          <BotaoAdicionar texto={resultado} onAdicionar={onAdicionar} />
          <BotaoCopiar
            texto={resultado}
            chave={`modelo:${item.id}`}
            onCopiar={onCopiar}
            copiado={copiado}
          />
        </div>
      </div>
    </div>
  );
}

/** Aba "Filtros PoGo": colinha das palavras-chave da busca do jogo e um
 *  montador pra juntar várias numa busca só. Clicar num termo joga ele no
 *  montador; o ícone de copiar ao lado copia só aquele termo. */
export function FiltrosPoGo() {
  const [clausulas, setClausulas] = useState<Clausula[]>([]);
  const [livre, setLivre] = useState("");
  const proximoId = useRef(1);
  const { copiado, copiar } = useCopiar();

  const busca = montarBusca(clausulas);

  function adicionar(termo: string) {
    const limpo = termo.trim();
    if (!limpo) return;
    setClausulas((atual) => [
      ...atual,
      { id: proximoId.current++, termo: limpo, negado: false, conector: "&" },
    ]);
  }

  function alterar(id: number, mudanca: Partial<Clausula>) {
    setClausulas((atual) =>
      atual.map((c) => (c.id === id ? { ...c, ...mudanca } : c)),
    );
  }

  function remover(id: number) {
    setClausulas((atual) => atual.filter((c) => c.id !== id));
  }

  function adicionarLivre() {
    adicionar(livre);
    setLivre("");
  }

  const acoes: AcoesTermo = { onAdicionar: adicionar, onCopiar: copiar, copiado };

  const [secaoVisivel, setSecaoVisivel] = useState<string>(SECOES[0].id);
  const montadorRef = useRef<HTMLElement>(null);
  const navCelularRef = useRef<HTMLElement>(null);

  /** Até onde o topo da tela está tapado por coisa grudada: o header, mais
   *  a faixa de atalhos (celular) ou o montador (md+, que gruda no topo). */
  function alturaTapada() {
    const navCelular = navCelularRef.current;
    if (navCelular && navCelular.offsetParent !== null) {
      return 56 + navCelular.offsetHeight + 8;
    }
    if (window.matchMedia("(min-width: 768px)").matches && montadorRef.current) {
      return 64 + montadorRef.current.offsetHeight + 12;
    }
    return 76;
  }

  function irPara(id: string) {
    const el = document.getElementById(`filtro-${id}`);
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY - alturaTapada();
    window.scrollTo({ top: topo, behavior: "smooth" });
  }

  useEffect(() => {
    // Mesma ideia da Pokédex: a seção ativa é a última cujo topo já passou
    // da parte tapada pelo que está grudado no topo.
    function aoRolar() {
      const limiar = alturaTapada() + 8;
      let atual: string = SECOES[0].id;

      for (const secao of SECOES) {
        const el = document.getElementById(`filtro-${secao.id}`);
        if (el && el.getBoundingClientRect().top <= limiar) atual = secao.id;
      }

      setSecaoVisivel(atual);
    }

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    // Na faixa do celular, o atalho ativo pode estar fora da área visível —
    // rola só a faixa (scrollIntoView rolaria a página junto).
    const faixa = navCelularRef.current;
    const ativo = faixa?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!faixa || !ativo || faixa.offsetParent === null) return;
    faixa.scrollTo({
      left: ativo.offsetLeft - faixa.clientWidth / 2 + ativo.clientWidth / 2,
      behavior: "smooth",
    });
  }, [secaoVisivel]);

  function atalhos(celular: boolean) {
    return SECOES.map((secao) => {
      const ativa = secao.id === secaoVisivel;

      return (
        <button
          key={secao.id}
          type="button"
          onClick={() => irPara(secao.id)}
          aria-current={ativa || undefined}
          className={cn(
            "text-left font-medium transition",
            celular
              ? "shrink-0 rounded-full border px-3 py-1 text-xs"
              : "rounded-lg px-3 py-2 text-sm",
            ativa
              ? celular
                ? "border-primary bg-primary/10 text-primary"
                : "bg-primary/10 text-primary"
              : celular
                ? "border-border text-muted-foreground hover:text-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
          )}
        >
          {secao.titulo}
        </button>
      );
    });
  }

  return (
    <div
      className={cn(
        "sm:flex sm:items-start sm:gap-6",
        busca && "pb-20 md:pb-0",
      )}
    >
      <nav
        aria-label="Categorias de filtro"
        className="hidden sm:sticky sm:top-16 sm:flex sm:w-40 sm:shrink-0 sm:flex-col sm:gap-1 sm:border-r sm:border-border sm:pr-4"
      >
        {atalhos(false)}
      </nav>

      <div className="min-w-0 flex-1 space-y-8">
        <section
          ref={montadorRef}
          aria-label="Montador de busca"
          className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm md:sticky md:top-16 md:z-30"
        >
          <div className="flex items-center gap-2">
            <code
              className={cn(
                "min-h-9 min-w-0 flex-1 break-all rounded-lg bg-muted px-3 py-2 font-mono text-sm",
                !busca && "text-muted-foreground",
              )}
            >
              {busca || "Toque nos termos abaixo pra montar sua busca"}
            </code>
            <button
              type="button"
              disabled={!busca}
              onClick={() => copiar(busca, "montador")}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {copiado === "montador" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copiado === "montador" ? "Copiado!" : "Copiar"}
            </button>
          </div>

          {clausulas.length > 0 && (
            <ul className="flex flex-wrap items-center gap-1.5">
              {clausulas.map((c, i) => (
                <li key={c.id} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        alterar(c.id, { conector: c.conector === "&" ? "," : "&" })
                      }
                      title="Trocar entre e (&) / ou (,)"
                      className="rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      {c.conector === "&" ? "e" : "ou"}
                    </button>
                  )}
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border text-xs",
                      c.negado
                        ? "border-destructive/40 bg-destructive/10"
                        : "border-border bg-background",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => alterar(c.id, { negado: !c.negado })}
                      aria-pressed={c.negado}
                      title={c.negado ? "Tirar o “não”" : "Inverter (não)"}
                      className={cn(
                        "rounded-l-full py-1 pl-2.5 pr-1 font-mono font-bold transition",
                        c.negado
                          ? "text-destructive"
                          : "text-muted-foreground/50 hover:text-foreground",
                      )}
                    >
                      !
                    </button>
                    <code className="py-1 font-mono">{c.termo}</code>
                    <button
                      type="button"
                      onClick={() => remover(c.id)}
                      aria-label={`Remover ${c.termo}`}
                      className="rounded-r-full py-1 pl-1 pr-2 text-muted-foreground transition hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setClausulas([])}
                  className="ml-1 text-xs text-muted-foreground underline-offset-2 transition hover:text-foreground hover:underline"
                >
                  limpar
                </button>
              </li>
            </ul>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adicionarLivre();
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={livre}
              onChange={(e) => setLivre(e.target.value)}
              placeholder="Outro termo (ex.: nome do Pokémon)"
              aria-label="Adicionar termo livre ao montador"
              className="h-8 flex-1 rounded-md px-2 text-sm"
            />
            <button
              type="submit"
              disabled={!livre.trim()}
              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </button>
          </form>
        </section>

        {/* Celular: atalhos numa faixa só, grudada embaixo do header — com
            11 categorias, quebrando linha (como na Pokédex) ocuparia meia tela. */}
        <nav
          ref={navCelularRef}
          aria-label="Categorias de filtro"
          className="sticky top-14 z-30 -mx-4 flex gap-2 overflow-x-auto bg-background/90 px-4 py-2 backdrop-blur-md [scrollbar-width:none] sm:hidden"
        >
          {atalhos(true)}
        </nav>

        <section
          id="filtro-como-combinar"
          aria-label="Como combinar"
          className="space-y-2"
        >
          <h2 className="text-lg font-semibold">Como combinar</h2>
          <dl className="grid gap-2 sm:grid-cols-2">
            {OPERADORES_FILTRO.map((op) => (
              <div
                key={op.simbolo}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
              >
                <dt className="w-5 shrink-0 text-center font-mono text-lg font-bold text-primary">
                  {op.simbolo}
                </dt>
                <dd className="min-w-0 text-xs text-muted-foreground">
                  {op.descricao}
                  <code className="ml-1.5 font-mono text-foreground">
                    {op.exemplo}
                  </code>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {CATEGORIAS_FILTRO.map((categoria) => (
          <section
            key={categoria.id}
            id={`filtro-${categoria.id}`}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold">{categoria.titulo}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {categoria.itens.map((item) =>
                item.tipo === "termo" ? (
                  <CartaoTermo key={item.termo} item={item} {...acoes} />
                ) : (
                  <CartaoModelo key={item.id} item={item} {...acoes} />
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Celular: o montador não fica grudado no topo (ocuparia meia tela),
          então a busca montada aparece embaixo pra copiar sem rolar de volta. */}
      {busca && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur md:hidden">
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate font-mono text-sm">
              {busca}
            </code>
            <button
              type="button"
              onClick={() => copiar(busca, "montador")}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              {copiado === "montador" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copiado === "montador" ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
