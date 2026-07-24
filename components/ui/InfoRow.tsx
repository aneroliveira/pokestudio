type InfoRowProps = {
  label: string;
  value: string | number;
};

export function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {label}
      </span>

      <strong className="text-lg font-bold text-foreground">
  {value}
</strong>
    </div>
  );
}