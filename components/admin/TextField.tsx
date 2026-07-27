type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  rightElement?: React.ReactNode;
  readOnly?: boolean;
};

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rightElement,
  readOnly = false,
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
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-border bg-background px-3 py-2 ${readOnly
              ? "cursor-default bg-muted text-muted-foreground"
              : ""
            }`}
        />

        {rightElement}
      </div>
    </div>
  );
}