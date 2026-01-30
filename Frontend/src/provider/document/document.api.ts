import type { ApiResponse, DocumentsData } from "./document.types";
import { DOCUMENT_API } from "@/constants/api";

export const getDocumentsApi = async (token: string,): Promise<ApiResponse<DocumentsData>> => {
  const res = await fetch(`${DOCUMENT_API.GET_DOCUMENTS}`, {
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
};

export const uploadDocumentsApi = async (files: File[], token: string,): Promise<ApiResponse<DocumentsData>> => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append("documents", file);
  });

  const res = await fetch(`${DOCUMENT_API.UPLOAD_DOCUMENTS}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw data;
  }

  return data;
};
