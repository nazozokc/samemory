# samemory

agentの共有メモリをMCPサーバーにするためのツール

# Install

- Claude Code

```json
{
  "mcpServers": {
    "samemory": {
      "type": "stdio",
      "command": "bunx",
      "args": ["samemory"]
    }
  }
}
```

- Codex

```toml
[mcp_servers.samemory]
command = "bunx"
args = ["samemory"]
enabled = true
```

- OpenCode

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "samemory": {
      "type": "local",
      "command": ["bunx", "samemory"],
      "enabled": true
    }
  }
}
```
