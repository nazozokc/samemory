#!/usr/bin/env node

import { main } from "./main.ts";

main().catch((error: unknown) => {
  console.error("[samemory] startup failed:", error);
  process.exitCode = 1;
});
