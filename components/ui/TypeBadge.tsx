type TypeBadgeProps = {
  label: string;
};

export function TypeBadge({
  label,
}: TypeBadgeProps) {
  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium">
      {label}
    </span>
  );
}