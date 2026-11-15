import { z } from "zod";

export const ConfigTypeSchema = z.object({
  dir: z.string(),
});

export type ConfigType = z.infer<typeof ConfigTypeSchema>;
