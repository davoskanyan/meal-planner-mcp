import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  IngredientListSchema,
  getIngredientList,
  IngredientSchema,
  addIngredient,
  deleteIngredient,
  UpdateIngredientSchema,
  updateIngredient,
  RecipeListSchema,
  getRecipeList,
  RecipeSchema,
  addRecipe,
  deleteRecipe,
  UpdateRecipeSchema,
  updateRecipe,
} from "../db";

export function registerTools(server: McpServer) {
  server.registerTool(
    "list-ingredients",
    {
      title: "List Ingredients Tool",
      description: "List all ingredients in the database",
      inputSchema: z.object({}),
      outputSchema: {
        ingredients: IngredientListSchema,
      },
    },
    async () => {
      const ingredients = await getIngredientList();
      const structuredContent = { ingredients };

      return {
        content: [
          {
            type: "text",
            text: "Here are the ingredients in the database:",
          },
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    }
  );

  server.registerTool(
    "add-ingredient",
    {
      title: "Add Ingredient Tool",
      description: "Add an ingredient to the database",
      inputSchema: IngredientSchema,
      outputSchema: IngredientSchema,
    },
    async (ingredient) => {
      const addedIngredient = await addIngredient(ingredient);
      return {
        content: [
          {
            type: "text",
            text: "Ingredient added successfully",
          },
          {
            type: "text",
            text: JSON.stringify(addedIngredient),
          },
        ],
        structuredContent: addedIngredient,
      };
    }
  );

  server.registerTool(
    "delete-ingredient",
    {
      title: "Delete Ingredient Tool",
      description: "Delete an ingredient from the database",
      inputSchema: z.object({ id: z.string() }),
      outputSchema: IngredientSchema,
    },
    async ({ id }) => {
      const deletedIngredient = await deleteIngredient(id);

      return {
        content: [
          {
            type: "text",
            text: "Ingredient deleted successfully",
          },
          {
            type: "text",
            text: JSON.stringify(deletedIngredient),
          },
        ],
        structuredContent: deletedIngredient,
      };
    }
  );

  server.registerTool(
    "update-ingredient",
    {
      title: "Update Ingredient Tool",
      description: "Update an ingredient in the database",
      inputSchema: UpdateIngredientSchema,
      outputSchema: IngredientSchema,
    },
    async (ingredient) => {
      const updatedIngredient = await updateIngredient(ingredient);
      return {
        content: [
          {
            type: "text",
            text: "Ingredient updated successfully",
          },
          {
            type: "text",
            text: JSON.stringify(updatedIngredient),
          },
        ],
        structuredContent: updatedIngredient,
      };
    }
  );

  server.registerTool(
    "list-recipes",
    {
      title: "List Recipes Tool",
      description: "List all recipes in the database",
      inputSchema: z.object({}),
      outputSchema: {
        recipes: RecipeListSchema,
      },
    },
    async () => {
      const recipes = await getRecipeList();
      const structuredContent = { recipes };

      return {
        content: [
          {
            type: "text",
            text: "Here are the recipes in the database:",
          },
          { type: "text", text: JSON.stringify(structuredContent) },
        ],
        structuredContent,
      };
    }
  );

  server.registerTool(
    "add-recipe",
    {
      title: "Add Recipe Tool",
      description: "Add a recipe to the database",
      inputSchema: RecipeSchema,
      outputSchema: RecipeSchema,
    },
    async (recipe) => {
      const addedRecipe = await addRecipe(recipe);
      return {
        content: [
          {
            type: "text",
            text: "Recipe added successfully",
          },
          {
            type: "text",
            text: JSON.stringify(addedRecipe),
          },
        ],
        structuredContent: addedRecipe,
      };
    }
  );

  server.registerTool(
    "delete-recipe",
    {
      title: "Delete Recipe Tool",
      description: "Delete a recipe from the database",
      inputSchema: z.object({ id: z.string() }),
      outputSchema: RecipeSchema,
    },
    async ({ id }) => {
      const deletedRecipe = await deleteRecipe(id);

      return {
        content: [
          {
            type: "text",
            text: "Recipe deleted successfully",
          },
          {
            type: "text",
            text: JSON.stringify(deletedRecipe),
          },
        ],
        structuredContent: deletedRecipe,
      };
    }
  );

  server.registerTool(
    "update-recipe",
    {
      title: "Update Recipe Tool",
      description: "Update a recipe in the database",
      inputSchema: UpdateRecipeSchema,
      outputSchema: RecipeSchema,
    },
    async (recipe) => {
      const updatedRecipe = await updateRecipe(recipe);
      return {
        content: [
          {
            type: "text",
            text: "Recipe updated successfully",
          },
          {
            type: "text",
            text: JSON.stringify(updatedRecipe),
          },
        ],
        structuredContent: updatedRecipe,
      };
    }
  );
}
