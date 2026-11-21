import { stat, readdir, readFile } from "node:fs/promises";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { join } from "node:path";
import {
  AgentMemorySchema,
  CategorySchema,
  type Category,
} from "../Globaltype";

export const SearchData = async (): Promise<void> => {
  const dir = await ConfigDir();
  const readmemoryDir = await readdir(dir, "utf-8");

  for (const memoryDir of readmemoryDir) {
    const jadgeFile = await stat(join(dir, memoryDir));
    if (!jadgeFile.isDirectory()) continue;
    const memoryDirParse = CategorySchema.safeParse(memoryDir);
    if (!memoryDirParse.success) continue;

    const categoryreadDir = await readdir(join(dir, memoryDir), "utf-8");

    for (const categoryDir of categoryreadDir) {
      const FileRead = await readFile(categoryDir);
      const filesafeparse = AgentMemorySchema.safeParse(FileRead);

      if (!filesafeparse.success) continue;
    }
  }
};
