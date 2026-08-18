"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gem,
  NotebookPen,
  Sparkles,
  Swords,
} from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import type { TipoPokemon } from "@/models/pokemon";

type Estreia = {
  nome: string;
  tipos: TipoPokemon[];
  origem: string;
};

const ESTREIAS: Estreia[] = [
  {
    nome: "Arrokuda",
    tipos: ["Water"],
    origem:
      "Pesquisa de Campo, Passe GO e Iscas Chuvosas. Evolui em Barraskewda com 50 doces.",
  },
  {
    nome: "Cramorant",
    tipos: ["Water"],
    origem:
      "Ovos de 5 km, Passe GO e Liga de Batalha (Rank 16+). Muda de forma em batalha.",
  },
];

type Janela = {
  periodo: string;
  xp: string;
  poeira: string;
  pico?: boolean;
};

const JANELAS: Janela[] = [
  {
    periodo: "18/08 (ter) 10h → 20/08 (qui) 10h",
    xp: "2×",
    poeira: "3×",
  },
  {
    periodo: "20/08 (qui) 10h → 22/08 (sáb) 10h",
    xp: "3×",
    poeira: "4×",
  },
  {
    periodo: "22/08 (sáb) 10h → 24/08 (seg) 20h",
    xp: "4×",
    poeira: "5×",
    pico: true,
  },
];

type Encontro = {
  nome: string;
  tipos: TipoPokemon[];
  nota: string;
  shiny?: boolean;
};

const ENCONTROS: Encontro[] = [
  { nome: "Psyduck", tipos: ["Water"], nota: "Com boia", shiny: true },
  { nome: "Feebas", tipos: ["Water"], nota: "Raro" },
  { nome: "Clamperl", tipos: ["Water"], nota: "Raro" },
  { nome: "Ducklett", tipos: ["Water", "Flying"], nota: "Shiny turbinado", shiny: true },
  { nome: "Dewpider", tipos: ["Water", "Bug"], nota: "Shiny turbinado", shiny: true },
];

type GrupoReide = {
  nivel: string;
  chefes: { nome: string; tipos: TipoPokemon[] }[];
};

const REIDES: GrupoReide[] = [
  {
    nivel: "Nível 1",
    chefes: [{ nome: "Arrokuda", tipos: ["Water"] }],
  },
  {
    nivel: "Nível 3",
    chefes: [
      { nome: "Dondozo", tipos: ["Water"] },
      { nome: "Samurott de Hisui", tipos: ["Water", "Dark"] },
      { nome: "Lapras", tipos: ["Water", "Ice"] },
    ],
  },
];

export default function FestivalAquaticoPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        {/* Hero temático — gradiente água/roxo, com sheen e bolhas sutis. */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-cyan-500/15 via-sky-500/10 to-purple-500/15 p-6 shadow-sm sm:p-8 dark:from-cyan-400/10 dark:via-sky-400/10 dark:to-purple-400/15">
          <div
            aria-hidden
            className="animate-festival-shimmer pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />

          <span
            aria-hidden
            className="animate-festival-float pointer-events-none absolute bottom-5 left-10 h-2 w-2 rounded-full bg-cyan-400/60"
            style={{ animationDelay: "0s" }}
          />
          <span
            aria-hidden
            className="animate-festival-float pointer-events-none absolute bottom-3 left-24 h-1.5 w-1.5 rounded-full bg-sky-400/60"
            style={{ animationDelay: "1.1s" }}
          />
          <span
            aria-hidden
            className="animate-festival-float pointer-events-none absolute bottom-7 right-16 h-2.5 w-2.5 rounded-full bg-purple-400/50"
            style={{ animationDelay: "0.6s" }}
          />
          <span
            aria-hidden
            className="animate-festival-float pointer-events-none absolute bottom-2 right-32 h-1.5 w-1.5 rounded-full bg-cyan-300/60"
            style={{ animationDelay: "1.9s" }}
          />

          <svg
            aria-hidden
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full text-cyan-500/25 dark:text-cyan-400/15"
          >
            <path
              fill="currentColor"
              d="M0,20 C50,35 100,5 150,20 C200,35 250,5 300,20 C350,35 400,5 400,20 L400,40 L0,40 Z"
            />
          </svg>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Pico de 5× Poeira Estelar em 22–24/08
            </span>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Festival Aquático Ultra Bônus
            </h2>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              18 a 24 de agosto de 2026
            </p>
          </div>
        </div>

        {/* Estreias */}
        <Card>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-lg font-semibold">Estreias</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              <Sparkles className="h-3 w-3" />
              Novo
            </span>
          </div>

          <div className="mt-4 divide-y divide-border/50">
            {ESTREIAS.map((estreia) => (
              <div key={estreia.nome} className="flex items-start gap-3 py-3 first:pt-0">
                <div className="flex shrink-0 -space-x-1">
                  {estreia.tipos.map((tipo) => (
                    <TypeIcon key={tipo} tipo={tipo} compact className="bg-secondary" />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="font-medium leading-tight">{estreia.nome}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {estreia.origem}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-attention px-3 py-2.5 text-sm text-attention-foreground">
            <span aria-hidden>⚠️</span>
            <span>
              <strong>Dica:</strong> priorizar doce de Arrokuda — linha mais
              difícil de completar depois do evento.
            </span>
          </div>
        </Card>

        {/* Bônus de Poeira Estelar — card principal, com destaque visual */}
        <Card className="relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/5 via-card to-cyan-500/5 ring-1 ring-primary/20 dark:from-primary/10 dark:to-cyan-400/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Gem className="h-4 w-4 text-primary" />
            Bônus de Poeira Estelar
          </h2>

          <div className="mt-4 overflow-x-auto">
            {/* Sem min-width: diferente das tabelas de moveset (nomes longos
                de golpe), aqui só 3 colunas curtas — cabe direto no celular
                sem exigir swipe pra ver XP/Poeira, o motivo do card existir. */}
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-3 font-medium">Janela</th>
                  <th className="pb-2 pr-3 font-medium">XP</th>
                  <th className="pb-2 font-medium">Poeira</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {JANELAS.map((janela) => (
                  <tr
                    key={janela.periodo}
                    className={janela.pico ? "bg-primary/5 dark:bg-primary/10" : undefined}
                  >
                    <td className="py-2.5 pr-3 font-medium">
                      {janela.periodo}
                      {janela.pico && <span className="ml-2">✨</span>}
                    </td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{janela.xp}</td>
                    <td
                      className={
                        janela.pico
                          ? "py-2.5 font-semibold text-primary"
                          : "py-2.5 text-muted-foreground"
                      }
                    >
                      {janela.poeira}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-sm text-foreground/90 dark:bg-primary/15">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              <strong>Dica:</strong> use Fragmento Estelar na janela de 5× —
              o multiplicador chega a <strong>10×</strong>.
            </span>
          </div>
        </Card>

        {/* Encontros no Selvagem */}
        <Card>
          <h2 className="text-lg font-semibold">💧 Encontros no Selvagem</h2>

          <div className="mt-4 divide-y divide-border/50">
            {ENCONTROS.map((encontro) => (
              <div key={encontro.nome} className="flex items-center gap-3 py-2.5">
                <div className="flex shrink-0 -space-x-1">
                  {encontro.tipos.map((tipo) => (
                    <TypeIcon
                      key={tipo}
                      tipo={tipo}
                      compact
                      className="bg-secondary ring-2 ring-card"
                    />
                  ))}
                </div>
                <span className="font-medium">{encontro.nome}</span>
                <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                  {encontro.shiny && <span aria-hidden>✨</span>}
                  {encontro.nota}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Reides */}
        <Card>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Swords className="h-4 w-4 text-muted-foreground" />
            Reides
          </h2>

          <div className="mt-4 space-y-4">
            {REIDES.map((grupo) => (
              <div key={grupo.nivel}>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {grupo.nivel}
                </span>

                <div className="mt-2 divide-y divide-border/50">
                  {grupo.chefes.map((chefe) => (
                    <div key={chefe.nome} className="flex items-center gap-3 py-2">
                      <div className="flex shrink-0 -space-x-1">
                        {chefe.tipos.map((tipo) => (
                          <TypeIcon
                            key={tipo}
                            tipo={tipo}
                            compact
                            className="bg-secondary ring-2 ring-card"
                          />
                        ))}
                      </div>
                      <span className="font-medium">{chefe.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Nota da Lori — conexão com a curadoria do /plano */}
        <Card className="relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/10 via-accent/50 to-transparent dark:from-primary/15 dark:via-accent/30">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <NotebookPen className="h-4 w-4" />
            Nota da Lori
          </div>

          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            Segure os fortalecimentos pendentes (<strong>Raikou</strong>,{" "}
            <strong>Gengar</strong>, <strong>Tyranitar 3 Stars</strong>) até a
            janela de 5× em 22–24/08. Com Fragmento Estelar, cada nível sai
            pela metade do custo relativo.
          </p>

          <Link
            href="/plano"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver o plano completo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
      </div>
    </PageContainer>
  );
}
