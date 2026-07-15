type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
};

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2"
      />
    </div>
  );
}