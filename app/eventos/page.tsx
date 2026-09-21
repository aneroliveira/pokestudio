import { PageContainer } from "@/components/layout/PageContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotinaSemanal } from "@/components/eventos/RotinaSemanal";
import { EventosView } from "@/components/eventos/EventosView";
import { listarEventos } from "@/data/eventos";

/**
 * Sem chamada a nenhuma API "dinâmica" do Next, essa página é elegível a
 * renderização estática — o que significa `new Date()` rodando uma vez no
 * build e nunca mais, deixando o selo Ativo/Em breve/Encerrado congelado
 * na data do último deploy em produção (visto: Mega Ascension preso em
 * "Em breve" durante o evento inteiro, porque promoção pra produção é
 * manual — ver memória "Deploy na Vercel"). Revalidar a cada minuto evita
 * isso sem abrir mão do cache estático entre requisições.
 */
export const revalidate = 60;

export default function EventosPage() {
  const agora = new Date();
  const eventos = listarEventos(agora);

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        <SectionTitle
          title="Eventos"
          subtitle="Bônus, estreias e reides especiais de cada evento em cartaz."
        />

        <EventosView eventos={eventos} hojeISO={agora.toISOString()} />

        <RotinaSemanal />
      </div>
    </PageContainer>
  );
}
