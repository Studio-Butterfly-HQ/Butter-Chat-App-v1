export interface ProfilePayload {
  name: string
  category: string
  country: string
  language: string
  timezone: string
  avatar?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface Profile {
  id: string
  name: string
  category: string
  country: string
  language: string
  timezone: string
  avatar?: string
}



export interface CountryAPI {
  name?: { common: string }
  cca2?: string
  languages?: Record<string, string>
  timezones?: string[]
}

export interface Option {
  value: string
  label: string
}

export interface ProfileMetaResponse {
  countries: Option[]
  languages: Option[]
  timezones: Option[]
}
