import { readFile } from "node:fs\/promises";
import { ConfigDefault } from "./ConfigDefault.ts";
import { type ConfigType, ConfigTypeSchema } from "./ConfigType.ts";
import { CONFIG_DIR } from "./app.ts";

export const ConfigDir = async (): Promise<ConfigType["dir"]> => {
  try {
    const readConfig = await readFile(CONFIG_DIR, "utf-8");
    const readConfigSchema = ConfigTypeSchema.safeParse(JSON.parse(readConfig));

    if (readConfigSchema.error) {
      return ConfigDefault.dir;
    }

    return readConfigSchema.data.dir;
  } catch (error) {
    return ConfigDefault.dir;
  }
};
