"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { BlocoCard } from "@/components/plano/BlocoCard";
import { OrdemExecucao, type Sincronia } from "@/components/plano/OrdemExecucao";
import { EstadoPorTipo } from "@/components/plano/EstadoPorTipo";
import { Etiquetas } from "@/components/plano/Etiquetas";
import { Aprendizados } from "@/components/plano/Aprendizados";
import type { Plano, ProgressoPlano } from "@/models/plano";
import {
  aplicarProgresso,
  carregarPlano,
  carregarProgresso,
  gravarCacheLocal,
  gravarSenha,
  lerCacheLocal,
  lerSenha,
  salvarProgresso,
  type ResultadoSalvar,
} from "@/services/plano";

const SECOES = [
  "Ordem de execução",
  "A auditoria",
  "Estado por tipo",
  "Etiquetas",
  "Aprendizados",
] as const;

type Secao = (typeof SECOES)[number];

/** "2026-08-16" → "16/08/2026", sem passar por Date (que traria fuso). */
function formatarData(iso: string): string {
  return iso.split("-").reverse().join("/");
}

const SINCRONIA_POR_RESULTADO: Record<ResultadoSalvar, Sincronia> = {
  salvo: "sincronizado",
  "sem-senha": "bloqueado",
  "senha-invalida": "senha-invalida",
  offline: "offline",
};

/** Conteúdo da curadoria de atacantes de reide — aba "Plano" do /admin. */
export function PlanoView() {
  const [plano, setPlano] = useState<Plano | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [secao, setSecao] = useState<Secao>("Ordem de execução");
  const [erro, setErro] = useState<string | null>(null);
  const [senha, setSenha] = useState<string | null>(null);
  const [sincronia, setSincronia] = useState<Sincronia>("bloqueado");

  // Numa ref, não em estado: marcar dois passos em toques seguidos acontece
  // antes do React re-renderizar, e um closure com o valor antigo faria o
  // segundo apagar o primeiro. Nada aqui é renderizado direto — a lista vem
  // de `plano.ordemExecucao`.
  const progresso = useRef<ProgressoPlano>({});

  // Serializa as gravações. Sem isso, dois toques rápidos viram dois PUTs
  // concorrentes e o que chegar por último no servidor decide — podendo ser
  // o que carrega o valor mais antigo.
  const fila = useRef<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    let cancelado = false;

    async function iniciar() {
      try {
        const curadoria = await carregarPlano();
        const remoto = await carregarProgresso();

        // Sem resposta do servidor a página ainda abre, com o último estado
        // conhecido deste aparelho — é o caso de estar sem sinal na rua.
        const atual = remoto ?? lerCacheLocal();
        if (remoto) gravarCacheLocal(remoto);

        if (cancelado) return;

        const senhaSalva = lerSenha();
        progresso.current = atual;
        setSenha(senhaSalva);
        setSincronia(
          !remoto ? "offline" : senhaSalva ? "sincronizado" : "bloqueado",
        );
        setPlano({
          ...curadoria,
          ordemExecucao: aplicarProgresso(curadoria.ordemExecucao, atual),
        });
      } catch {
        if (!cancelado) setErro("Não foi possível carregar o plano.");
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    iniciar();

    return () => {
      cancelado = true;
    };
  }, []);

  function enfileirarGravacao(
    dados: ProgressoPlano,
    chave: string | null,
  ): Promise<void> {
    setSincronia("salvando");

    fila.current = fila.current
      .then(() => salvarProgresso(dados, chave))
      .then((resultado) => setSincronia(SINCRONIA_POR_RESULTADO[resultado]));

    return fila.current as Promise<void>;
  }

  function alternarPasso(id: string, concluido: boolean) {
    const atualizado = { ...progresso.current, [id]: concluido };

    progresso.current = atualizado;
    gravarCacheLocal(atualizado);

    setPlano((atual) =>
      atual
        ? {
            ...atual,
            ordemExecucao: atual.ordemExecucao.map((passo) =>
              passo.id === id ? { ...passo, concluido } : passo,
            ),
          }
        : atual,
    );

    enfileirarGravacao(atualizado, senha);
  }

  /** Valida a senha gravando o estado atual — se voltar 200, ela serve. */
  async function desbloquear(informada: string) {
    setSenha(informada);
    await enfileirarGravacao(progresso.current, informada);
  }

  function esquecerSenha() {
    setSenha(null);
    gravarSenha(null);
    setSincronia("bloqueado");
  }

  // Só persiste a senha depois que o servidor aceitou, para não guardar uma
  // senha errada e a página reabrir travada sem explicar por quê.
  useEffect(() => {
    if (sincronia === "sincronizado" && senha) gravarSenha(senha);
  }, [sincronia, senha]);

  if (carregando) {
    return (
      <div className="w-full">
        <SectionTitle title="Plano" subtitle="Carregando a curadoria..." />
        <div className="h-64 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  if (!plano) {
    return (
      <div className="w-full">
        <SectionTitle
          title="Plano"
          subtitle={erro ?? "Nenhum plano encontrado."}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <SectionTitle
          title={plano.meta.titulo}
          subtitle={plano.meta.subtitulo}
        />

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span className="text-muted-foreground">
            Auditoria de{" "}
            <strong className="font-semibold text-foreground">
              {formatarData(plano.meta.data)}
            </strong>{" "}
            · {plano.meta.tiposVarridos} tipos varridos
          </span>
          <span className="text-muted-foreground">
            Poeira estelar:{" "}
            <strong className="font-semibold text-foreground">
              {plano.meta.poeiraEstelar.toLocaleString("pt-BR")}
            </strong>
          </span>
          <span className="text-muted-foreground">
            Gargalo:{" "}
            <strong className="font-semibold text-foreground">
              {plano.meta.gargalo}
            </strong>
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Mobile/tablet: dropdown nativo, mesmo padrão do FAQ. */}
        <div className="relative lg:hidden">
          <select
            value={secao}
            onChange={(evento) => setSecao(evento.target.value as Secao)}
            className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-9 text-sm font-medium text-foreground"
          >
            {SECOES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Desktop: sidebar vertical. */}
        <nav className="hidden lg:flex lg:flex-col lg:gap-1 lg:self-start lg:sticky lg:top-20">
          {SECOES.map((item) => {
            const selecionada = item === secao;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setSecao(item)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  selecionada
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="min-w-0">
          {secao === "Ordem de execução" && (
            <OrdemExecucao
              passos={plano.ordemExecucao}
              bloqueios={plano.bloqueios}
              onAlternar={alternarPasso}
              sincronia={sincronia}
              onDesbloquear={desbloquear}
              onEsquecerSenha={esquecerSenha}
              onTentarNovamente={() =>
                enfileirarGravacao(progresso.current, senha)
              }
            />
          )}

          {secao === "A auditoria" && (
            <div className="space-y-6">
              <Card>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A varredura completa, bloco a bloco. Toque em qualquer
                  Pokémon para abrir o card dele na busca.
                </p>
              </Card>

              {plano.blocos.map((bloco) => (
                <BlocoCard key={bloco.id} bloco={bloco} />
              ))}
            </div>
          )}

          {secao === "Estado por tipo" && (
            <EstadoPorTipo estados={plano.estadoPorTipo} />
          )}

          {secao === "Etiquetas" && (
            <Etiquetas
              etiquetas={plano.etiquetas}
              countersPorChefe={plano.countersPorChefe}
            />
          )}

          {secao === "Aprendizados" && (
            <Aprendizados
              armadilhas={plano.armadilhas}
              glossario={plano.glossario}
              buscas={plano.buscas}
              diagnostico={plano.diagnostico}
            />
          )}
        </div>
      </div>
    </div>
  );
}
