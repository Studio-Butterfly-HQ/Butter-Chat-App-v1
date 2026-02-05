import { z } from "zod";

export const configureAgentSchema = z.object({
  // Identity
  agentName: z.string().min(3, "Agent name must be at least 3 characters"),

  // Personality
  personality: z.enum(["friendly", "neutral", "professional", "humorous"]),

  // General Instructions
  generalInstruction: z.string().min(10, "General instruction must be at least 10 characters"),

  // AI Unable to Assist
  aiFallback: z.enum(["transfer", "message"]),
  aiFallbackCustom: z.string().min(10, "AI fallback custom message must be at least 10 characters"),
  aiFallbackWait: z.boolean(),

  // Human Agent
  humanTransferMessage: z.string().min(10, "Human transfer message must be at least 10 characters"),
});

export type ConfigureAgentFormValues = z.infer<typeof configureAgentSchema>;
