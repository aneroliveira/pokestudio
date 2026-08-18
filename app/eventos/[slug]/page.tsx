import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/PageContainer";
import { EventoHero } from "@/components/eventos/EventoHero";
import { EventoEstreias } from "@/components/eventos/EventoEstreias";
import { EventoBonusPoeira } from "@/components/eventos/EventoBonusPoeira";
import { EventoEncontros } from "@/components/eventos/EventoEncontros";
import { EventoReides } from "@/components/eventos/EventoReides";
import { EventoNotaCuradoria } from "@/components/eventos/EventoNotaCuradoria";
import { buscarEvento } from "@/data/eventos";

export default async function EventoPage(props: PageProps<"/eventos/[slug]">) {
  const { slug } = await props.params;
  const evento = buscarEvento(slug);

  if (!evento) notFound();

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        <EventoHero
          titulo={evento.titulo}
          periodoTexto={evento.periodoTexto}
          tema={evento.tema}
          badge={evento.badge}
        />

        {evento.estreias && (
          <EventoEstreias lista={evento.estreias.lista} dica={evento.estreias.dica} />
        )}

        {evento.bonusPoeira && (
          <EventoBonusPoeira
            janelas={evento.bonusPoeira.janelas}
            dica={evento.bonusPoeira.dica}
            tema={evento.tema}
          />
        )}

        {evento.encontros && <EventoEncontros encontros={evento.encontros} />}

        {evento.reides && <EventoReides grupos={evento.reides} />}

        {evento.notaCuradoria && (
          <EventoNotaCuradoria
            texto={evento.notaCuradoria.texto}
            linkPlano={evento.notaCuradoria.linkPlano}
          />
        )}
      </div>
    </PageContainer>
  );
}
