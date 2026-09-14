import { ArrowUp } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NavegacaoTipos } from "@/components/atacantes/NavegacaoTipos";
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

        {ATACANTES_POR_TIPO.map((ranking) => (
          <RankingTipo key={ranking.tipo} ranking={ranking} />
        ))}
      </div>

      <a
        href="#topo"
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:bg-secondary"
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </PageContainer>
  );
}
