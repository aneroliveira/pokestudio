import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { EtiquetaChip } from "@/components/plano/EtiquetaChip";
import { STATUS_TIPO_CLASSE, STATUS_TIPO_LABEL } from "@/constants/plano";
import type { EstadoTipo } from "@/models/plano";

type EstadoPorTipoProps = {
  estados: EstadoTipo[];
};

export function EstadoPorTipo({ estados }: EstadoPorTipoProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold">Estado por tipo</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Quem é o titular de cada tipo hoje, do mais coberto ao mais
        descoberto.
      </p>

      <ul className="mt-4 divide-y divide-border/50">
        {estados.map((estado) => (
          <li key={estado.tipo} className="py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <TypeIcon
                tipo={estado.tipo}
                className="bg-secondary"
                compact
                mostrarNome
              />

              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  STATUS_TIPO_CLASSE[estado.status]
                }`}
              >
                {STATUS_TIPO_LABEL[estado.status]}
              </span>

              {estado.etiqueta && <EtiquetaChip etiqueta={estado.etiqueta} />}
            </div>

            <p className="mt-1.5 text-sm">
              <span className="text-muted-foreground">Titular: </span>
              {estado.titular}
            </p>

            {estado.reservas && estado.reservas.length > 0 && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Reservas: {estado.reservas.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
