import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { api } from "../db";

export function registerResources(server: McpServer) {
  server.registerResource(
    "ingredients",
    "meal-planner://ingredients",
    {
      title: "Ingredients",
      description: "All ingredients currently in the database",
    },
    async (uri) => {
      const ingredients = await api.getIngredientList();
      return {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify(ingredients),
            uri: uri.toString(),
          },
        ],
      };
    }
  );

  server.registerResource(
    "ingredient",
    new ResourceTemplate("meal-planner://ingredients/{id}", {
      list: async () => {
        const ingredients = await api.getIngredientList();
        return {
          resources: ingredients.map((ingredient) => ({
            uri: `meal-planner://ingredients/${ingredient.id}`,
            name: ingredient.name,
            title: ingredient.name,
            mimeType: "application/json",
          })),
        };
      },
      complete: {
        async id(value) {
          const ingredients = await api.getIngredientList();
          return ingredients
            .map((ingredient) => ingredient.id.toString())
            .filter((id) => id.includes(value));
        },
      },
    }),
    {
      title: "Ingredient",
      description: "An ingredient in the database",
    },
    async (uri, { id }) => {
      const ingredient = await api.getIngredient(id as string);
      if (!ingredient) {
        throw new Error(`Ingredient with id ${id} not found`);
      }
      return {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify(ingredient),
            uri: uri.toString(),
          },
        ],
      };
    }
  );

  server.registerResource(
    "recipes",
    "meal-planner://recipes",
    {
      title: "Recipes",
      description: "All recipes in the database",
    },
    async (uri) => {
      const recipes = await api.getRecipeList();
      return {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify(recipes),
            uri: uri.toString(),
          },
        ],
      };
    }
  );

  server.registerResource(
    "recipe",
    new ResourceTemplate("meal-planner://recipes/{id}", {
      list: async () => {
        const recipes = await api.getRecipeList();
        return {
          resources: recipes.map((recipe) => ({
            uri: `meal-planner://recipes/${recipe.id}`,
            name: recipe.name,
            title: recipe.name,
            mimeType: "application/json",
          })),
        };
      },
      complete: {
        async id(value) {
          const recipes = await api.getRecipeList();
          return recipes
            .map((recipe) => recipe.id.toString())
            .filter((id) => id.includes(value));
        },
      },
    }),
    {
      title: "Recipe",
      description: "A recipe in the database",
    },
    async (uri, { id }) => {
      const recipe = await api.getRecipe(id as string);
      if (!recipe) {
        throw new Error(`Recipe with id ${id} not found`);
      }
      return {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify(recipe),
            uri: uri.toString(),
          },
        ],
      };
    }
  );
}
