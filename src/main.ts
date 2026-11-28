import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { MemoryGetInputSchema } from "./memory_get/type.ts";
import { MCP_NAME } from "./constant/app.ts";
import { getFile } from "./memory_get/index.ts";
import { AgentMemorySaveSchema } from "./memory_save/type.ts";
import { writeMemoryFile } from "./memory_save/index.ts";
import { SearchSchema } from "./memory_search/type.ts";
import { Search } from "./memory_search/index.ts";

const server = new McpServer({ name: MCP_NAME, version: "0.0.5" });

server.registerTool(
  "memory_get",
  {
    description: "Get agent memory",
    inputSchema: MemoryGetInputSchema,
  },
  async ({ id }) => {
    const memory = await getFile(id);

    if (!memory) {
      return {
        content: [
          {
            type: "text",
            text: `Not Found ${id}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: "Memory retrieved successfully.",
        },
      ],
      structuredContent: memory,
    };
  },
);

server.registerTool(
  "memory_save",
  {
    description: "Get agent memory",
    inputSchema: AgentMemorySaveSchema,
  },
  async ({ category, tags, agent, title, summary, content }) => {
    const result = await writeMemoryFile({
      category,
      tags,
      agent,
      title,
      summary,
      content,
    });

    if (result === true) {
      return {
        content: [
          {
            type: "text",
            text: "successfully save agent memory",
          },
        ],
        structuredContent: {
          success: true,
        },
      };
    }

    return {
      content: [
        {
          type: "text",
          text: "Failed save agent memory",
        },
      ],
      structuredContent: {
        isError: true,
      },
    };
  },
);

server.registerTool(
  "memory_search",
  {
    description: "Get agent memory",
    inputSchema: SearchSchema,
  },
  async ({ query, category, tags, limit }) => {
    const result = await Search({
      query,
      category,
      tags,
      limit,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  },
);

export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Done Start up MCP");
}
