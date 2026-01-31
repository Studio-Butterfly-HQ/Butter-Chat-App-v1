import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GeneralSettings() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [timezone, setTimezone] = useState("");
  const [language, setLanguage] = useState("");

  const categories = [
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Services",
  ];

  const timezones = [
    "UTC",
    "EST (UTC-5)",
    "CST (UTC-6)",
    "MST (UTC-7)",
    "PST (UTC-8)",
    "GMT (UTC+0)",
    "CET (UTC+1)",
    "IST (UTC+5:30)",
    "JST (UTC+9)",
    "AEST (UTC+10)",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];

  return (
    <>
      <header className="flex flex-col border-b border-border md:flex-row mb-0.5 min-h-16 md:h-16 shrink-0 items-start md:items-center justify-between gap-3 md:gap-2 py-3 md:py-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full md:w-auto">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <span className="text-sm md:text-base font-semibold whitespace-nowrap">
              General Settings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 w-full md:w-auto justify-start md:justify-end overflow-x-auto">
          <Badge
            variant="outline"
            className="cursor-pointer rounded-full hover:bg-accent px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            <span>Learn More</span>
          </Badge>
          <Badge className="cursor-pointer rounded-full px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap">
            <Save className="h-3 w-3 mr-1.5" />
            <span>Save Changes</span>
          </Badge>
        </div>
      </header>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">General Settings</CardTitle>
            <CardDescription>
              Please fill up all the fields with relevant information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label>
                Business Name
              </label>
              <Input
                type="text"
                placeholder="XYZ Corporation"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full h-10"
              />
            </div>

            {/* Business Category */}
            <div className="space-y-2">
              <label>
                Business Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <label>
                Timezone
              </label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select a Timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label>
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
