import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotinaSemanal } from "@/components/eventos/RotinaSemanal";
import { listarEventos } from "@/data/eventos";
import { ROTULO_ESTADO, ESTILO_ESTADO } from "@/constants/estadoEvento";

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
  const eventos = listarEventos(new Date());

  return (
    <PageContainer>
      <div className="w-full max-w-4xl space-y-6">
        <SectionTitle
          title="Eventos"
          subtitle="Bônus, estreias e reides especiais de cada evento em cartaz."
        />

        {eventos.length === 0 ? (
          <Card>
            <p className="text-sm text-muted-foreground">
              Nenhum evento cadastrado no momento.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {eventos.map(({ evento, estado }) => (
              <Link key={evento.slug} href={`/eventos/${evento.slug}`}>
                <Card className="flex items-center justify-between gap-4 hover:border-primary/40">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{evento.titulo}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[estado]}`}
                      >
                        {ROTULO_ESTADO[estado]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {evento.periodoTexto}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Card>
              </Link>
            ))}
          </div>
        )}

        <RotinaSemanal />
      </div>
    </PageContainer>
  );
}
