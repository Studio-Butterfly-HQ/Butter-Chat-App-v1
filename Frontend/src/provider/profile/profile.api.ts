import type {
  Option,
  ProfileMetaResponse,
  AvatarUploadResponse,
} from "./profile.types";
import type { ProfilePayload, ApiResponse, Profile } from "./profile.types";
import { COUNTRY_API_URL, IP_INFO_URL } from "@/constants";
import { COMPANY_API, FILE_HANDLE_API } from "@/constants/api";

export const uploadAvatarApi = async (
  file: File,
  token: string,
): Promise<AvatarUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(FILE_HANDLE_API.UPLOAD_AVATAR, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileApi = async (
  file: File,
  token: string,
): Promise<AvatarUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(FILE_HANDLE_API.UPLOAD_AVATAR, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileApi = async (
  payload: ProfilePayload,
  token: string,
) => {
  try {
    const res = await fetch(`${COMPANY_API.UPDATE_PROFILE}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyProfileApi = async (token: string) => {
  try {
    const res = await fetch(COMPANY_API.GET_PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfileMetaApi = async (): Promise<ProfileMetaResponse> => {
  const res = await fetch(COUNTRY_API_URL);
  if (!res.ok) throw new Error("Failed to fetch countries");

  const data = await res.json();

  const countries: Option[] = [];
  const languageMap = new Map<string, string>();

  data.forEach((c: any) => {
    if (c.cca2 && c.name?.common) {
      countries.push({
        value: c.cca2,
        label: c.name.common,
      });
    }

    if (c.languages) {
      Object.entries(c.languages).forEach(([code, name]) => {
        languageMap.set(code, name as string);
      });
    }
  });

  const timezones: Option[] = Intl.supportedValuesOf("timeZone").map((tz) => ({
    value: tz,
    label: tz,
  }));

  return {
    countries: countries.sort((a, b) => a.label.localeCompare(b.label)),
    languages: Array.from(languageMap.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    timezones,
  };
};

export const fetchLocationDefaultsApi = async () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language.split("-")[0];

  try {
    const res = await fetch(IP_INFO_URL);
    const ip = await res.json();
    const country = ip?.country || null;
    return { country, timezone, language };
  } catch {
    return {
      country: null,
      timezone,
      language,
    };
  }
};
