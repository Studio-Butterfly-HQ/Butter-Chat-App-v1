import { EMAIL_DOMAINS } from "@/constants/emailDomains"
import { levenshtein } from "./levenshtein"

export const getEmailSuggestions = (value: string) => {
  if (!value.includes("@")) return []

  const [, rawDomainPart] = value.split("@")
  const domainPart = rawDomainPart?.trim().toLowerCase()

  if (!domainPart) return EMAIL_DOMAINS.slice(0, 4)

  if (EMAIL_DOMAINS.some(d => d.toLowerCase() === domainPart)) return []

  const scoredDomains = EMAIL_DOMAINS.map(domain => ({
    domain,
    score: levenshtein(domainPart, domain.toLowerCase()),
    isPrefix: domain.toLowerCase().startsWith(domainPart),
  }))

  const prefixMatches = scoredDomains.filter(item => item.isPrefix)

  if (prefixMatches.length > 0) {
    return prefixMatches
      .sort((a, b) => a.score - b.score)
      .slice(0, 4)
      .map(item => item.domain)
  }

  return scoredDomains
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map(item => item.domain)
}
