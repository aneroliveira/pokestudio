type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2"
      />
    </div>
  );
}