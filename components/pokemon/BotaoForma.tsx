import { ToggleChip } from "@/components/ui/ToggleChip";
import { IconeForma, type Forma } from "@/components/pokemon/IconeForma";

const ROTULOS: Record<Forma, string> = {
  shiny: "Shiny",
  mega: "Mega",
  gigamax: "Gigamax",
};

type BotaoFormaProps = {
  forma: Forma;
  ativo: boolean;
  onClick: () => void;
};

/** Chip de forma (Shiny/Mega/Gigamax) usado nas duas fichas: ícone do jogo
 *  + nome no computador, só o ícone no celular (onde o nome vira dica e
 *  rótulo pro leitor de tela). */
export function BotaoForma({ forma, ativo, onClick }: BotaoFormaProps) {
  const rotulo = ROTULOS[forma];

  return (
    <ToggleChip ativo={ativo} onClick={onClick} rotulo={rotulo}>
      <IconeForma forma={forma} />
      <span className="hidden sm:inline">{rotulo}</span>
    </ToggleChip>
  );
}
