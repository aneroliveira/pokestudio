type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  rightElement?: React.ReactNode;
};

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rightElement,
}: TextFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2"
        />

        {rightElement}
      </div>
    </div>
  );
}