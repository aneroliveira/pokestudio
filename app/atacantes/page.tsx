import { ArrowUp } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NavegacaoTipos } from "@/components/atacantes/NavegacaoTipos";
import { LegendaAtacantes } from "@/components/atacantes/LegendaAtacantes";
import { RankingTipo } from "@/components/atacantes/RankingTipo";
import { ATACANTES_POR_TIPO } from "@/data/atacantesPorTipo";

export default function AtacantesPage() {
  return (
    <PageContainer>
      <div id="topo" className="w-full max-w-4xl space-y-6 scroll-mt-20">
        <SectionTitle
          title="Melhores Atacantes"
          subtitle="Top 5 por tipo — Mega, Sombrosos e Primordiais incluídos. Curado a partir do db.pokemongohub.net."
        />

        <NavegacaoTipos />
        <LegendaAtacantes />

        {ATACANTES_POR_TIPO.map((ranking) => (
          <RankingTipo key={ranking.tipo} ranking={ranking} />
        ))}
      </div>

      {/* Mobile: canto da tela (comportamento original) — o conteúdo já
          ocupa quase a largura toda, então "perto do conteúdo" já é aqui. */}
      <a
        href="#topo"
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-secondary sm:hidden"
      >
        <ArrowUp className="h-5 w-5" />
      </a>

      {/* Desktop: alinhado com a borda direita do card (max-w-4xl), não
          com o canto do viewport — em telas largas isso ficava longe
          demais do conteúdo. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden sm:block">
        <div className="relative mx-auto w-full max-w-4xl">
          <a
            href="#topo"
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            className="pointer-events-auto absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-secondary"
          >
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </PageContainer>
  );
}
