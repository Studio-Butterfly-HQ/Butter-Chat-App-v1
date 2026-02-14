import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DateTime() {
  const { company } = useAppSelector((state) => state.auth);

  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    if (company) {
      setLanguage(company.language || "Bangla");
      setCountry(company.country || "Bangladesh");
      setTimezone(company.timezone || "Asia/Dhaka");
    }
  }, [company]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4 pt-0">
      <Card className="shadow-none bg-transparent p-6">
        <CardContent className="p-0 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="font-normal">
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="h-10">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Bangla">Bangla</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="font-normal">
                Country
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="h-10">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="font-normal">
                Timezone
              </Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone" className="h-10">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="Asia/Dhaka">Asia/Dhaka</SelectItem>
                  <SelectItem value="America/New_York">
                    America/New_York
                  </SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-start">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
