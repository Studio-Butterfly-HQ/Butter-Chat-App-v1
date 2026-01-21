import { EMAIL_DOMAINS } from "@/constants/emailDomains"
import { levenshtein } from "./levenshtein"

export const getEmailSuggestions = (value: string) => {
  if (!value.includes("@")) return []

  const [, domainPart] = value.split("@")
  if (!domainPart) return EMAIL_DOMAINS.slice(0, 4)

  return EMAIL_DOMAINS
    .map(domain => {
      const distance = levenshtein(domainPart, domain)

      const isPrefixMatch = domain.startsWith(domainPart)
      const prefixBonus = isPrefixMatch ? -5 : 0

      return {
        domain,
        score: distance + prefixBonus,
      }
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map(item => item.domain)
}
