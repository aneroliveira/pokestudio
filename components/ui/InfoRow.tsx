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
      <span className="text-zinc-600">
        {label}
      </span>

      <strong className="text-lg font-bold text-zinc-900">
  {value}
</strong>
    </div>
  );
}