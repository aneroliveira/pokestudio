type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pt-8">
        {children}
      </div>
    </main>
  );
}