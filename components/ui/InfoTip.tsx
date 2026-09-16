"use client";

import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

type InfoTipProps = {
  texto: string;
  topico?: string;
  className?: string;
};

export function InfoTip({ texto, topico, className }: InfoTipProps) {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Saiba mais"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full p-0.5 text-muted-foreground transition hover:bg-accent hover:text-foreground",
          className,
        )}
      >
        <Info className="h-3.5 w-3.5" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" align="center" sideOffset={8} className="z-50">
          <Popover.Popup className="w-64 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
            <p className="leading-relaxed">{texto}</p>
            {topico && (
              <Link
                href={`/faq?topico=${topico}`}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Ver mais no FAQ
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
