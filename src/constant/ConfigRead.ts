import { join } from "node:path";
import { homedir } from "node:os";
import { readFile } from "node:fs\/promises";
import { ConfigDefault } from "./ConfigDefault.ts";
import { type ConfigType, ConfigTypeSchema } from "./ConfigType.ts";

const CONFIG_DIR = join(homedir(), ".config", "my-memory", "config.json");

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
