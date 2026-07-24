type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function FormSection({
  title,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="border-b border-border pb-2 text-lg font-semibold">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}