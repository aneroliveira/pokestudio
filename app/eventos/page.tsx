import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { listarEventos, type EstadoEvento } from "@/data/eventos";

const ROTULO_ESTADO: Record<EstadoEvento, string> = {
  ativo: "Ativo agora",
  "em-breve": "Em breve",
  encerrado: "Encerrado",
};

const ESTILO_ESTADO: Record<EstadoEvento, string> = {
  ativo: "bg-good text-good-foreground",
  "em-breve": "bg-attention text-attention-foreground",
  encerrado: "bg-secondary text-secondary-foreground",
};

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
      </div>
    </PageContainer>
  );
}
