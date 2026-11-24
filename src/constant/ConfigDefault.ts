import { type ConfigType } from "./ConfigType.ts";
import { homedir } from "node:os";
import { join } from "node:path";

export const ConfigDefault: ConfigType = {
  dir: join(homedir(), "samemory"),
};
