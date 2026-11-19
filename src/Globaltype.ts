import { z } from "zod";

export const CategorySchema = z.enum([
  "lessons",
  "patterns",
  "context",
  "commands",
  "preferences",
]);

export type Category = z.infer<typeof CategorySchema>;

export const AgentMemorySchema = z.object({
  id: z.string(),
  category: CategorySchema,
  tags: z.array(z.string()),
  created: z.iso.datetime(),
  agent: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});

export type AgentMemory = z.infer<typeof AgentMemorySchema>;
