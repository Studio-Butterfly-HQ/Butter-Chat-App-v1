import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { getEmailSuggestions } from "@/utils/emailSuggestion"
import { useDebounce } from "@/hooks/use-debounce"

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export const EmailInput = ({ value, onChange, onBlur }: EmailInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isCommitted, setIsCommitted] = useState(false)

  const debouncedValue = useDebounce(value, 200)

  useEffect(() => {
    if (!debouncedValue || isCommitted) {
      setSuggestions([])
      return
    }
    setSuggestions(getEmailSuggestions(debouncedValue))
  }, [debouncedValue, isCommitted])

  const applySuggestion = (domain: string) => {
    const local = value.split("@")[0]
    onChange(`${local}@${domain}`)
    setSuggestions([])
    setActiveIndex(-1)
    setIsCommitted(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % suggestions.length)
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(i =>
        (i - 1 + suggestions.length) % suggestions.length
      )
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      applySuggestion(suggestions[activeIndex])
    }
  }

  return (
    <div className="relative">
      <Input
        value={value}
        type="email"
        autoComplete="off"
        placeholder="user@xyzcorp.com"
        onChange={e => {
          setIsCommitted(false)
          onChange(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setTimeout(() => setSuggestions([]), 100)
          onBlur?.()
        }}
      />

      {suggestions.length > 0 && (
        <div className="absolute z-20 w-full bg-background border rounded-md mt-1 shadow-md">
          {suggestions.map((domain, index) => (
            <div
              key={domain}
              className={`px-3 py-2 text-sm cursor-pointer ${
                index === activeIndex
                  ? "bg-muted font-medium"
                  : "hover:bg-muted"
              }`}
              onMouseDown={() => applySuggestion(domain)}
            >
              {value.split("@")[0]}@
              <span className="font-semibold">{domain}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
