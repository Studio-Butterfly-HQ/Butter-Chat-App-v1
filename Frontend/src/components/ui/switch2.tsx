interface SimpleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch2({
  checked,
  onChange,
  disabled = false,
}: SimpleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-10 shrink-0 items-center rounded-full
        transition-colors duration-200
        ${checked ? "bg-primary" : "bg-muted"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-background shadow
          transform transition-transform duration-200
          ${checked ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </button>
  );
}
