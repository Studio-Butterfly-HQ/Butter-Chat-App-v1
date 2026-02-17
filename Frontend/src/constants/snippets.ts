import { Snippet } from "@/provider/snippet/snippet.types";

export const DUMMY_SNIPPETS: Snippet[] = [
  {
    id: "1",
    title: "Welcome Message",
    content: "Hi there! How can I help you today?",
    status: "SYNCED",
    updatedAt: "2023-10-27T10:00:00Z",
  },
  {
    id: "2",
    title: "Pricing Inquiry",
    content: "Our clear and transparent pricing starts at $99/mo.",
    status: "SYNCED",
    updatedAt: "2023-10-26T14:30:00Z",
  },
  {
    id: "3",
    title: "Return Policy",
    content: "You can return any item within 30 days of purchase.",
    status: "FAILED",
    updatedAt: "2023-10-25T09:15:00Z",
  },
  {
    id: "4",
    title: "Business Hours",
    content: "We are open Mon-Fri from 9am to 5pm EST.",
    status: "PENDING",
    updatedAt: "2023-10-24T16:45:00Z",
  },
  {
    id: "5",
    title: "Contact Support",
    content: "Reach us at support@example.com or call 555-0123.",
    status: "SYNCED",
    updatedAt: "2023-10-23T11:20:00Z",
  },
];
