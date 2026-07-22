type MultiSelectFieldProps = {
  label: string;
  options: readonly string[];
  value: readonly string[];
  onChange: (value: string[]) => void;
};

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
}: MultiSelectFieldProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={(event) =>
                onChange(
                  event.target.checked
                    ? [...value, option]
                    : value.filter((item) => item !== option),
                )
              }
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
