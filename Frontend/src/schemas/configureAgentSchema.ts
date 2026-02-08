import { z } from "zod";

// Identity
export const identitySchema = z.object({
  agentName: z.string().min(3, "Agent name must be at least 3 characters"),
});

// Personality
export const personalitySchema = z.object({
  personality: z.enum(["friendly", "neutral", "professional", "humorous"]),
});

// General Instructions
export const instructionsSchema = z.object({
  generalInstruction: z
    .string()
    .min(10, "General instruction must be at least 10 characters"),
});

// AI Unable to Assist
export const fallbackSchema = z
  .object({
    aiFallback: z.enum(["transfer", "message"]),
    aiFallbackCustom: z.string().optional(),
    aiFallbackWait: z.boolean(),
  })
  .refine(
    (data) =>
      data.aiFallback !== "message" ||
      (data.aiFallbackCustom && data.aiFallbackCustom.length >= 10),
    {
      message: "AI fallback custom message must be at least 10 characters",
      path: ["aiFallbackCustom"],
    },
  );
// Human Agent
export const handoverSchema = z.object({
  humanTransferMessage: z
    .string()
    .min(10, "Human transfer message must be at least 10 characters"),
});

export const configureAgentSchema = z.object({
  ...identitySchema.shape,
  ...personalitySchema.shape,
  ...instructionsSchema.shape,
  ...fallbackSchema.shape,
  ...handoverSchema.shape,
});

export type IdentityFormValues = z.infer<typeof identitySchema>;
export type PersonalityFormValues = z.infer<typeof personalitySchema>;
export type InstructionsFormValues = z.infer<typeof instructionsSchema>;
export type FallbackFormValues = z.infer<typeof fallbackSchema>;
export type HandoverFormValues = z.infer<typeof handoverSchema>;
export type ConfigureAgentFormValues = z.infer<typeof configureAgentSchema>;
