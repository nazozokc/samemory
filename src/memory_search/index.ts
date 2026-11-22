import Fuse from "fuse.js";
import { SearchData } from "./SearchData";
import type { SearchType } from "./type";
import type { AgentMemory } from "../Globaltype";

export const SearchIndex = async ({
  query,
  category,
  tags,
  limit,
}: SearchType): Promise<AgentMemory[]> => {
  const limited = limit ?? 30;
  const fuse = new Fuse(await SearchData(), {
    includeScore: true,
    includeMatches: true,
    keys: [],
  });

  let results = fuse.search(query);

  if (category !== undefined) {
    results = results.filter((result) => result.item.category === category);
  }

  if (tags !== undefined) {
    results = results.filter((result) =>
      tags.every((tag) => result.item.tags.includes(tag)),
    );
  }

  return results.slice(0, limited).map((result) => result.item);
};
