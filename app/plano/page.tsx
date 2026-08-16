"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { BlocoCard } from "@/components/plano/BlocoCard";
import { OrdemExecucao } from "@/components/plano/OrdemExecucao";
import { EstadoPorTipo } from "@/components/plano/EstadoPorTipo";
import { Etiquetas } from "@/components/plano/Etiquetas";
import { Aprendizados } from "@/components/plano/Aprendizados";
import type { Plano } from "@/models/plano";
import { carregarPlano, salvarPasso } from "@/services/plano";

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

export default function PlanoPage() {
  const [plano, setPlano] = useState<Plano | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [secao, setSecao] = useState<Secao>("Ordem de execução");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarPlano()
      .then(setPlano)
      .catch(() => setErro("Não foi possível carregar o plano."))
      .finally(() => setCarregando(false));
  }, []);

  async function alternarPasso(id: string, concluido: boolean) {
    // Otimista: o checkbox responde na hora e só volta atrás se o PATCH
    // falhar. Marcar um passo em pé na rua não pode esperar rede.
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
    setErro(null);
    setSalvando(true);

    try {
      await salvarPasso(id, concluido);
    } catch {
      setPlano((atual) =>
        atual
          ? {
              ...atual,
              ordemExecucao: atual.ordemExecucao.map((passo) =>
                passo.id === id ? { ...passo, concluido: !concluido } : passo,
              ),
            }
          : atual,
      );
      setErro("Não foi possível salvar. O passo voltou ao estado anterior.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <PageContainer>
        <div className="w-full max-w-4xl">
          <SectionTitle title="Plano" subtitle="Carregando a curadoria..." />
          <div className="h-64 animate-pulse rounded-3xl bg-muted" />
        </div>
      </PageContainer>
    );
  }

  if (!plano) {
    return (
      <PageContainer>
        <div className="w-full max-w-4xl">
          <SectionTitle
            title="Plano"
            subtitle={erro ?? "Nenhum plano encontrado."}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
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
                salvando={salvando}
                erro={erro}
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
    </PageContainer>
  );
}
