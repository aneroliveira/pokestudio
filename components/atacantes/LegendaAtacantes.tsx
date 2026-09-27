import { Card } from "@/components/ui/Card";

/** Explicação de DPS/TDO/Score e dos marcadores de golpe — separada do
 *  card fixo (NavegacaoTipos) pra ele não ficar grande demais ocupando
 *  tela enquanto rola. */
export function LegendaAtacantes() {
  return (
    <Card>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground/80">DPS</strong> — dano por
          segundo.
        </p>
        <p>
          <strong className="text-foreground/80">TDO</strong> — dano total
          até &ldquo;morrer&rdquo; em combate (resistência ofensiva).
        </p>
        <p>
          <strong className="text-foreground/80">Score</strong> — nota da
          fonte combinando os dois; é o critério de ordenação do ranking.
        </p>
        <p>
          Golpes com <sup>*</sup> são legados — não dá mais pra ensinar
          normalmente, só via TM Elite (ou em quem já tinha de antes).
          Golpes com <sup>+</sup> são exclusivos, geralmente uma versão
          &ldquo;Plus&rdquo; do golpe carregado.
        </p>
      </div>
    </Card>
  );
}
