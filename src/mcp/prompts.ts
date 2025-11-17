import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";
import { api } from "../db";
import z from "zod";

export function registerPrompts(server: McpServer) {
  server.registerPrompt(
    "suggest-ingredients",
    {
      title: "Suggest Ingredients",
      description: "Suggest ingredients for a recipe",
      argsSchema: {
        recipeId: completable(
          z
            .string()
            .describe("The ID of the recipe to suggest ingredients for"),
          async (value) => {
            console.log("Getting recipe list");
            const recipes = await api.getRecipeList();
            return recipes
              .map((recipe) => recipe.id)
              .filter((id) => id.includes(value));
          }
        ),
      },
    },
    async ({ recipeId }) => {
      const recipe = await api.getRecipe(recipeId);
      if (!recipe) {
        throw new Error("Recipe is required");
      }
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `
Here is my recipe with ID "${recipeId}": ${JSON.stringify(recipe)}.
Please suggest some ingredients to add to it. Feel free to suggest new ingredients I don't have yet.
Use "list-ingredients" tool to get the list of ingredients I have available.
For each ingredient I approve, if it does not yet exist, create it with the MealPlanner "add-ingredient" tool. Then add approved ingredients to the recipe with the MealPlanner "add-ingredient-to-recipe" tool.
              `.trim(),
            },
          },
        ],
      };
    }
  );
}
