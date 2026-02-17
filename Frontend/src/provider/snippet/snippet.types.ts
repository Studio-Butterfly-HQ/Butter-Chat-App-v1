export interface Snippet {
  id: string;
  title: string;
  content: string;
  status: "SYNCED" | "FAILED" | "PENDING";
  updatedAt: string;
}
