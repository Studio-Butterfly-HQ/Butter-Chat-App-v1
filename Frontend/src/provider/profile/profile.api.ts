import type { CountryAPI, Option, ProfileMetaResponse } from "./profile.types";
import type { ProfilePayload, ApiResponse, Profile } from "./profile.types"
import {COUNTRY_API_URL} from "@/constants"
import { COMPANY_API  } from "@/constants/api";

export const updateProfileApi = async (payload: ProfilePayload, token: string) => {
  const res = await fetch(`${COMPANY_API.UPDATE_PROFILE}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) {
    throw data;
  }
  return data
}

export const fetchCompanyProfileApi = async (token: string) => {
  const res = await fetch(COMPANY_API.GET_PROFILE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw data;
  }

  return data
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
