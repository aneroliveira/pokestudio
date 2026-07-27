"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { TIERS, FUNCOES, MELHOR_PARA } from "@/constants/pokemon";

type Topico = {
  id: string;
  titulo: string;
  corpo: React.ReactNode;
};

// Legenda dos tiers — RASCUNHO, ajustar os textos depois (curadoria da Lori).
// Chaveado por tier; a ordem de exibição vem do array TIERS.
const TIER_LEGENDA: Record<(typeof TIERS)[number], string> = {
  "S+": "Essencial — prioridade máxima; está entre os melhores do jogo na função dele.",
  S: "Excelente — peça de topo, vale investir sem pensar duas vezes.",
  "A+": "Muito bom — forte e relevante no meta atual.",
  A: "Bom — sólido e útil em vários cenários.",
  B: "Situacional — brilha em nichos específicos ou como opção de orçamento.",
  C: "Dispensável — baixa prioridade; costuma ser pré-evolução ou filler.",
};

const TOPICOS: Topico[] = [
  {
    id: "nome",
    titulo: "Nome e forma",
    corpo: (
      <>
        <p>
          O nome e os dados oficiais vêm da PokéAPI e nunca são editados
          manualmente — toda sincronização os sobrescreve.
        </p>
        <p>
          Algumas espécies (Giratina, Landorus, Thundurus, Tornadus, Shaymin,
          Meloetta...) têm sua forma-base cadastrada na PokéAPI com um
          sufixo próprio (ex.: <code>giratina-altered</code>), mesmo sendo a
          forma padrão do Pokémon. O PokéStudio detecta esses casos e usa o
          nome da espécie (sempre limpo) em vez do nome bruto da variedade —
          por isso aparece só <strong>"Giratina"</strong>, não
          "Giratina-altered".
        </p>
        <p>
          Formas alternativas de verdade (Mega, Gigamax, Regional, Primal)
          continuam aparecendo formatadas na aba <strong>Forms</strong> do
          Admin, com o rótulo traduzido (ex.: "Mega Charizard X").
        </p>
      </>
    ),
  },
  {
    id: "tipos",
    titulo: "Tipos",
    corpo: (
      <>
        <p>
          Cada Pokémon tem um ou dois tipos, mostrados como os ícones{" "}
          <strong>oficiais do jogo</strong> — os mesmos badges usados dentro
          do Pokémon GO, extraídos diretamente do APK.
        </p>
        <div className="flex items-center gap-3 py-2">
          <TypeIcon tipo="Fire" className="bg-secondary" />
          <TypeIcon tipo="Water" className="bg-secondary" />
          <TypeIcon tipo="Dragon" className="bg-secondary" />
          <span className="text-sm text-muted-foreground">
            passe o mouse (ou toque no celular) pra ver o nome
          </span>
        </div>
        <p>
          Esse mesmo ícone é reaproveitado em várias seções do card:
          no cabeçalho, em "Combate" e no tipo recomendado de cada Mega.
        </p>
      </>
    ),
  },
  {
    id: "tier",
    titulo: "Tier, Função e Melhor para",
    corpo: (
      <>
        <p>
          O <strong>Tier</strong> é a nota de prioridade que o PokéStudio dá
          ao Pokémon — quanto mais alto, mais vale a pena investir nele. É
          curadoria própria do app, não uma métrica oficial do jogo.
        </p>
        <div className="space-y-1.5 py-1">
          {TIERS.map((tier) => (
            <div key={tier} className="flex items-baseline gap-3">
              <span className="w-9 shrink-0 rounded-full bg-secondary px-2 py-1 text-center text-xs font-semibold text-secondary-foreground">
                {tier}
              </span>
              <span className="text-sm">{TIER_LEGENDA[tier]}</span>
            </div>
          ))}
        </div>
        <p>
          <strong>Função</strong> classifica o papel do Pokémon:{" "}
          {FUNCOES.join(", ")}. <strong>Melhor para</strong> indica em quais
          modos ele se destaca: {MELHOR_PARA.join(", ")}.
        </p>
      </>
    ),
  },
  {
    id: "decisoes",
    titulo: "Chips de decisão",
    corpo: (
      <>
        <p>
          Cada Pokémon curado pode ter até 5 decisões práticas, sempre com o
          mesmo significado:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Vale guardar</strong> — mantenha no lugar de transferir.</li>
          <li><strong>Vale maximizar</strong> — vale gastar Poeira Estelar e doces pra levar ao nível máximo.</li>
          <li><strong>Vale Buddy</strong> — vale usar como Buddy pra ganhar doces (e XL).</li>
          <li><strong>Vale Elite TM</strong> — vale gastar uma TM rara pra garantir o melhor moveset.</li>
          <li><strong>Transferir</strong> — indica se compensa transferir exemplares comuns.</li>
        </ul>
        <p>
          A cor do chip indica o veredito: <span className="text-good-foreground">verde = sim</span>,{" "}
          <span className="text-attention-foreground">amarelo = depende do contexto</span>,{" "}
          <span className="text-bad-foreground">vermelho = não</span>. Quando o
          curador registra um motivo, ele aparece ao passar o mouse (ou tocar) no
          chip.
        </p>
      </>
    ),
  },
  {
    id: "hundos",
    titulo: "Hundos, quase-hundos e o CP",
    corpo: (
      <>
        <p>
          <strong>Hundo</strong> é o apelido para um Pokémon com IV 100% —
          15/15/15 de Ataque, Defesa e Vida, o máximo possível.{" "}
          <strong>Quase-hundo</strong> é quase tão bom, só que muito mais
          fácil de encontrar: 98% é 15/15/14, e 96% é 15/14/14.
        </p>
        <p className="rounded-lg bg-muted px-3 py-2 font-mono text-xs">
          CP = piso( (Atq+IVₐ) · √(Def+IV_d) · √(Vida+IVₛ) · CPM² / 10 )
        </p>
        <p>
          O <strong>nível</strong> (via CPM, o multiplicador por nível) é o
          que explica por que o mesmo IV aparece com CPs diferentes. Os dois
          valores do resumo são a captura de <strong>raid/ovo</strong>:{" "}
          <strong>"Sem clima"</strong> é o nível 20, e{" "}
          <strong>"Com clima"</strong> é o nível 25 — clima favorável soma
          +5 níveis ao encontro. Mesmo IV, nível maior → CP maior.
        </p>
        <p>
          A aba <strong>"Por nível"</strong> abre a lista completa de CP
          máximo por nível, incluindo os tetos de captura selvagem (30, ou
          35 com clima) e de investimento (40 sem doce XL, 50 com).
        </p>
        <p>
          Quando não há um valor manual salvo na curadoria, o ícone 🧮 indica
          que o número foi <strong>calculado automaticamente</strong> a
          partir das base stats reais do Pokémon GO (que não são as mesmas
          da PokéAPI — a Niantic ajusta os valores à mão).
        </p>
      </>
    ),
  },
  {
    id: "cp-divergente",
    titulo: "Por que o CP não bate com o jogo?",
    corpo: (
      <>
        <p>
          Os CPs mostrados aqui são <strong>referências calculadas</strong>,
          não a leitura do seu exemplar. Quando o número no jogo é diferente,
          quase sempre é por um destes motivos:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>O IV não é 100%.</strong> Todo CP desta seção assume
            15/15/15. Qualquer IV menor dá CP menor — é a causa nº 1 de
            divergência. Use os valores de 98%/96% como referência do quanto
            cai.
          </li>
          <li>
            <strong>Os níveis da lista são tetos por origem, não o nível do
            seu Pokémon.</strong> Raid e ovo são fixos no nível 20, então
            batem exatamente. Captura selvagem, não: ela varia e{" "}
            <em>pode vir bem abaixo</em> do nível 30 — o 30 é só o máximo
            possível.
          </li>
          <li>
            <strong>Clima favorável soma +5 níveis</strong> no momento do
            encontro (raid 20 → 25, selvagem 30 → 35). Só vale se o clima que
            impulsiona um dos tipos do Pokémon estava ativo na hora da
            captura — e o clima do jogo muda ao longo do dia.
          </li>
          <li>
            <strong>Origens especiais têm nível próprio.</strong> Sombrosos
            da Equipe GO Rocket, por exemplo, vêm num nível fixo bem mais
            baixo, que não aparece nesta lista.
          </li>
          <li>
            <strong>As base stats são um retrato do momento.</strong> Elas
            vêm de um arquivo gerado por script a partir do GAME_MASTER da
            comunidade. Se a Niantic reequilibrar algum Pokémon, os números
            aqui só mudam depois de regerar esse arquivo.
          </li>
        </ul>

        <p>
          Há também um caso específico do app: quando existe um CP salvo à
          mão na curadoria, o <strong>Resumo mostra o valor salvo</strong>,
          enquanto a lista <strong>"Por nível" é sempre calculada</strong>.
          Se o valor digitado for diferente do cálculo, os dois vão divergir
          entre si — e aí vale conferir qual está certo.
        </p>
      </>
    ),
  },
  {
    id: "combate",
    titulo: "Combate (atacando e defendendo)",
    corpo: (
      <>
        <p>
          Esta seção é <strong>sempre calculada</strong>, nunca curada
          manualmente — vem direto dos tipos oficiais do Pokémon, usando a
          tabela de efetividade padrão da série principal (a partir da
          Geração 6). O foco é <strong>raid e ginásio</strong>.
        </p>
        <p>
          <strong>⚔️ Atacando</strong> — o que importa quando ele é o seu
          atacante:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Bom contra</strong> — tipos em que os golpes dele batem{" "}
            <strong>forte</strong> (supereficaz). É o que decide contra quais
            chefes/defensores vale trazê-lo.
          </li>
        </ul>
        <p>
          <strong>🛡️ Defendendo</strong> — quanto de dano ele recebe enquanto
          ataca:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Fraco a</strong> — tipos que batem forte{" "}
            <strong>nele</strong> (as fraquezas dele); avisam quando um chefe
            vai derrubá-lo rápido.
          </li>
          <li>
            <strong>Resiste a</strong> — tipos que ele aguenta bem (recebe
            menos dano), sobrevivendo mais.
          </li>
        </ul>
        <p>
          Detalhe do GO: no Pokémon GO <strong>não existe imunidade</strong>.
          Onde a série principal zeraria o dano (ex.: Elétrico em Terra), o GO
          aplica uma <strong>resistência dupla</strong> (leva ~39% do dano) —
          por isso esses tipos aparecem dentro de <strong>Resiste a</strong>, e
          não numa lista de "imune".
        </p>
      </>
    ),
  },
  {
    id: "mega",
    titulo: "Melhor Mega contra",
    corpo: (
      <>
        <p>
          Este card é o "de fora pra dentro": mostra as melhores{" "}
          <strong>Megas para usar COMO counter contra</strong> o Pokémon
          exibido. É calculado automaticamente — o PokéStudio pega o roster
          completo de Mega Evoluções do Pokémon GO e ranqueia cada uma pela
          efetividade de tipo contra a tipagem dele (a mesma tabela de
          "Combate", vista do lado de quem ataca).
        </p>
        <p>
          Cada Mega mostra o multiplicador com um <strong>rótulo</strong> em
          linguagem simples do lado:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>2× · Supereficaz</strong> — o tipo da Mega é forte contra{" "}
            <strong>um</strong> dos tipos do Pokémon.
          </li>
          <li>
            <strong>4× · Fraqueza dupla</strong> — é forte contra{" "}
            <strong>os dois</strong> tipos ao mesmo tempo, causando dano ainda
            maior (ex.: Elétrico contra Gyarados, que é Água/Voador).
          </li>
        </ul>
        <p>
          Uma ressalva: esses <strong>2× e 4× são a notação da série
          principal</strong>, familiar pra maioria. No Pokémon GO os
          multiplicadores reais são <strong>×1,6</strong> (supereficaz) e{" "}
          <strong>×2,56</strong> (fraqueza dupla, 1,6 × 1,6) — o rótulo está
          ali justamente pra deixar claro o <em>significado</em>, não só o
          número.
        </p>
        <p>
          Em caso de empate, quem tem mais Ataque aparece primeiro. O roster de
          Megas (nomes, tipos, imagem, stats) vem de um mirror de assets
          extraídos do próprio jogo.
        </p>
      </>
    ),
  },
  {
    id: "observacoes",
    titulo: "Observações e Sinergias",
    corpo: (
      <>
        <p>
          As duas últimas seções são anotações livres do curador, sem
          cálculo nenhum por trás:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Observações</strong> — dicas práticas e contexto de uso.</li>
          <li><strong>Sinergias</strong> — outros Pokémon ou Megas que combinam bem com ele em times de raid.</li>
        </ul>
      </>
    ),
  },
];

export default function FaqPage() {
  const [ativo, setAtivo] = useState(TOPICOS[0].id);
  const topico = TOPICOS.find((t) => t.id === ativo) ?? TOPICOS[0];

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        <SectionTitle
          title="FAQ"
          subtitle="Como ler as informações exibidas sobre cada Pokémon."
        />

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Mobile/tablet: dropdown nativo — compacto, acessível, mostra
              todos os tópicos sem precisar arrastar. */}
          <div className="relative lg:hidden">
            <select
              value={ativo}
              onChange={(e) => setAtivo(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-9 text-sm font-medium text-foreground"
            >
              {TOPICOS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.titulo}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Desktop: sidebar vertical. */}
          <nav className="hidden lg:flex lg:flex-col lg:gap-1">
            {TOPICOS.map((t) => {
              const selecionado = t.id === ativo;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setAtivo(t.id)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    selecionado
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {t.titulo}
                </button>
              );
            })}
          </nav>

          <Card className="min-w-0">
            <h2 className="mb-4 text-lg font-semibold">{topico.titulo}</h2>
            <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
              {topico.corpo}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
