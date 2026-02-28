export type ConnectionCategory = "social" | "ecommerce";

export interface Connection {
  id: string;
  connected: boolean;
}

export interface SocialConnection {
  id: string;
  company_id: string;
  platform_name: string;
  platform_type: string;
  platform_token: string;
  createdDate: string;
  updatedDate: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
