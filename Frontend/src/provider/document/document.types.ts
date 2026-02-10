export interface Document {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  uploadedAt: string;
  url: string;
  syncStatus: string;
  folder: string;
}

export interface DocumentsData {
  total: number;
  documents: Document[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code?: string;
    details?: string;
  };
  timestamp: string;
  path?: string;
}
