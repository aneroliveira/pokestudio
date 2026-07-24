import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border bg-card p-6 shadow-sm transition-all",
        className
      )}
    >
      {children}
    </section>
  );
}