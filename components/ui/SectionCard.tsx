type SectionCardProps = {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  actions,
  children,
}: SectionCardProps) {
  return (
    <section className="mt-6 border-t border-border/50 pt-6">
      {title && (
        <div className="mb-4 flex items-center gap-1.5">
          <h2 className="text-lg font-semibold">{title}</h2>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}