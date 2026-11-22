import { stat, readdir, readFile } from "node:fs/promises";
import { ConfigDir } from "../constant/ConfigRead.ts";
import { join } from "node:path";
import {
  AgentMemorySchema,
  CategorySchema,
  type AgentMemory,
} from "../Globaltype";

export const SearchData = async (): Promise<AgentMemory[]> => {
  const dir = await ConfigDir();
  const readmemoryDir = await readdir(dir, "utf-8");
  const res: AgentMemory[] = [];

  for (const memoryDir of readmemoryDir) {
    const jadgeFile = await stat(join(dir, memoryDir));
    if (!jadgeFile.isDirectory()) continue;
    const memoryDirParse = CategorySchema.safeParse(memoryDir);
    if (!memoryDirParse.success) continue;

    const categoryreadDir = await readdir(join(dir, memoryDir), "utf-8");

    for (const categoryDir of categoryreadDir) {
      const filePath = join(dir, memoryDir, categoryDir);
      const FileRead = await readFile(filePath, "utf-8");
      const filesafeparse = AgentMemorySchema.safeParse(JSON.parse(FileRead));

      if (!filesafeparse.success) continue;

      res.push(filesafeparse.data);
    }
  }

  return res;
};
