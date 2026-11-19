import { z } from "zod";
import { CategorySchema } from "../Globaltype";

export const SearchSchema = z.object({
  query: z.string(),
  category: CategorySchema.optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

export type SearchType = z.infer<typeof SearchSchema>;
