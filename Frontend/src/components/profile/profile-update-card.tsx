import type React from "react"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface CountryAPI {
  name?: { common: string }
  cca2?: string
  languages?: Record<string, string>
  timezones?: string[]
}

interface Option {
  value: string
  label: string
}

export default function ProfileUpdateCard() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    country: "",
    language: "",
    timezone: "",
  })

  const [countries, setCountries] = useState<Option[]>([])
  const [languages, setLanguages] = useState<Option[]>([])
  const [timezones, setTimezones] = useState<Option[]>([])
  const [profilePhoto, setProfilePhoto] = useState("/placeholder.svg?height=112&width=112")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)

      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,languages,timezones"
      )
      const data: CountryAPI[] = await res.json()

      if (!Array.isArray(data)) return

      const countryOptions: Option[] = []
      const languageMap = new Map<string, string>()
      const timezoneSet = new Set<string>()

      data.forEach((c) => {
        if (c.name?.common && c.cca2) {
          countryOptions.push({
            value: c.cca2,
            label: c.name.common,
          })
        }

        if (c.languages) {
          Object.entries(c.languages).forEach(([code, name]) => {
            languageMap.set(code, name)
          })
        }

        if (c.timezones) {
          c.timezones.forEach((tz) => timezoneSet.add(tz))
        }
      })

      setCountries(
        countryOptions.sort((a, b) => a.label.localeCompare(b.label))
      )

      setLanguages(
        Array.from(languageMap.entries())
          .map(([value, label]) => ({ value, label }))
          .sort((a, b) => a.label.localeCompare(b.label))
      )

      setTimezones(
        Array.from(timezoneSet)
          .map((tz) => ({ value: tz, label: tz }))
          .sort((a, b) => a.label.localeCompare(b.label))
      )

      setLoading(false)
    }

    fetchAllData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) =>
      setProfilePhoto(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <Card className="bg-background border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-3xl font-bold">Update Profile</CardTitle>
        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>

        <div className="relative mt-8 mb-4">
          <Avatar className="h-36 mt-2 w-36">
            <AvatarImage src={profilePhoto} />
            <AvatarFallback>YN</AvatarFallback>
          </Avatar>

          <label
            htmlFor="photo-upload"
            className="absolute bottom-4 right-0 bg-blue-500 rounded-full p-2 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Field orientation="vertical">
          <FieldLabel>Your Name</FieldLabel>
          <Input name="name" placeholder="Joh Doe" value={formData.name} onChange={handleInputChange} />
        </Field>

        <Field orientation="vertical">
          <FieldLabel htmlFor="category">Company Category</FieldLabel>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="vertical">
          <FieldLabel>Country</FieldLabel>
          <Select
            value={formData.country}
            onValueChange={(v) => handleSelectChange("country", v)}
          >
            <SelectTrigger disabled={loading}>
              <SelectValue
                placeholder={
                  loading
                    ? "Loading countries..."
                    : "Select a country..."
                }
              />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="vertical">
          <FieldLabel>Language</FieldLabel>
          <Select
            value={formData.language}
            onValueChange={(v) => handleSelectChange("language", v)}
          >
            <SelectTrigger disabled={loading}>
              <SelectValue placeholder={
                loading
                  ? "Loading languages..."
                  : "Select a language..."
              } />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="vertical">
          <FieldLabel>Timezone</FieldLabel>
          <Select
            value={formData.timezone}
            onValueChange={(v) => handleSelectChange("timezone", v)}
          >
            <SelectTrigger disabled={loading}>
              <SelectValue placeholder={
                loading
                  ? "Loading timezones..."
                  : "Select a timezone..."
              } />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </CardContent>

      <CardFooter>
        <Button className="w-full font-medium" disabled={loading}>
          Complete Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
