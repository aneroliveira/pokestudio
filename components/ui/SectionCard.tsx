type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section className="mt-6">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
}