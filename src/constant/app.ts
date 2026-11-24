import { join } from "node:path";
import { homedir } from "node:os";

export const MCP_NAME = "samemory";
export const CONFIG_DIR = join(homedir(), ".config", "samemory", "config.json");
