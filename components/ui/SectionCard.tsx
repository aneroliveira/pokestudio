type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section className="mt-6 border-t border-border/50 pt-6">
      {title && (
  <h2 className="mb-4 text-lg font-semibold">
    {title}
  </h2>
)}
      {children}
    </section>
  );
}