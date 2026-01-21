import type { CountryAPI, Option, ProfileMetaResponse } from "./profile.types";
import type { ProfilePayload, ApiResponse, Profile } from "./profile.types"
import {COUNTRY_API_URL} from "@/constants"



export const updateProfileApi = async (payload: ProfilePayload) => {
  // console.log(payload);
  const res = await fetch("/api/profile/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to update profile")
  }

  return res.json()
}


export const fetchProfileMetaApi = async (): Promise<ProfileMetaResponse> => {
  const res = await fetch(`${COUNTRY_API_URL}`);

  if (!res.ok) {
    throw new Error("Failed to fetch countries data");
  }

  const data: CountryAPI[] = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid countries response");
  }

  const countryOptions: Option[] = [];
  const languageMap = new Map<string, string>();
  const timezoneSet = new Set<string>();

  data.forEach((c) => {
    if (c.name?.common && c.cca2) {
      countryOptions.push({
        value: c.cca2,
        label: c.name.common,
      });
    }

    if (c.languages) {
      Object.entries(c.languages).forEach(([code, name]) => {
        languageMap.set(code, name);
      });
    }

    if (c.timezones) {
      c.timezones.forEach((tz) => timezoneSet.add(tz));
    }
  });

  return {
    countries: countryOptions.sort((a, b) => a.label.localeCompare(b.label)),
    languages: Array.from(languageMap.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    timezones: Array.from(timezoneSet)
      .map((tz) => ({ value: tz, label: tz }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  };
};
