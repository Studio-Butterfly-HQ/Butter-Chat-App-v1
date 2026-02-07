import { useState } from "react";

interface Textarea2Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea2({
  value,
  onChange,
  className = "",
  ...props
}: Textarea2Props) {
  const [focused, setFocused] = useState(false);

  const hasValue = typeof value === "string" && value.length > 0;
  const showActiveBorder = focused || hasValue;

  return (
    <div
      className={`
        rounded-lg
        border
        transition-colors
        duration-200
        ${showActiveBorder ? "border-white" : "border-border"}
      `}
    >
      <textarea
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full
          resize-none
          bg-transparent
          px-3
          py-2
          min-h-[100px]
          text-sm
          outline-none
          ${className}
        `}
      />
    </div>
  );
}
