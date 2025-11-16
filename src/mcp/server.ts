import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "./tools";
import { registerResources } from "./resources";

export const server = new McpServer(
  {
    title: "Meal Planner MCP",
    name: "meal-planner-mcp",
    version: "1.0.0",
  },
  {
    instructions: `
This MCP server provides a fully automated weekly meal planning system for a family.
You can generate meal plans, adjust individual days, create shopping lists, and manage custom recipes.
    `.trim(),
  }
);

registerTools(server);
registerResources(server);
