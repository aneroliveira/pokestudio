import Image from "next/image";
import { cn } from "@/lib/utils";

const PIKACHU_ICONE =
  "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm25.icon.png";

/** Recorte manual do rosto: a imagem de origem é o Pikachu inteiro, de pé
 *  (256×256). Escalando pra 80px e deslocando com posição absoluta dentro
 *  de uma janela de 20px, só a região das orelhas ao queixo fica visível —
 *  sem depender de um asset à parte só com o rosto. */
function RostoPikachu({ espelhado = false }: { espelhado?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative h-5 w-5 shrink-0 overflow-hidden rounded-full opacity-15 grayscale brightness-0 dark:invert",
        espelhado && "-scale-x-100",
      )}
    >
      <Image
        src={PIKACHU_ICONE}
        alt=""
        width={80}
        height={80}
        className="absolute -left-[29px] -top-[37px] max-w-none"
      />
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto flex w-full max-w-md items-center justify-center gap-1.5 px-3 text-center text-[10px] text-muted-foreground sm:text-sm">
        <RostoPikachu />
        <span className="whitespace-nowrap">
          Feito com 💜 por quem só organizou o que a web já sabia
        </span>
        <RostoPikachu espelhado />
      </div>
    </footer>
  );
}
