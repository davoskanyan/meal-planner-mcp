const JSON_SERVER_URL = "http://localhost:3001";
import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  unit: z.enum(["kg", "pcs", "g", "ml", "l"]),
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const IngredientListSchema = z.array(IngredientSchema);

export const getIngredientList = async () => {
  const response = await fetch(`${JSON_SERVER_URL}/ingredients`);
  const data = await response.json();
  return IngredientListSchema.parse(data);
};

export const getIngredient = async (id: string) => {
  const response = await fetch(`${JSON_SERVER_URL}/ingredients/${id}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return IngredientSchema.parse(data);
};

export const addIngredient = async (ingredient: Ingredient) => {
  const existingIngredient = await getIngredient(ingredient.id);
  if (existingIngredient) {
    throw new Error(`Ingredient with id ${ingredient.id} already exists`);
  }

  const response = await fetch(`${JSON_SERVER_URL}/ingredients`, {
    method: "POST",
    body: JSON.stringify(ingredient),
  });
  const data = await response.json();
  return IngredientSchema.parse(data);
};

export const deleteIngredient = async (id: string) => {
  const response = await fetch(`${JSON_SERVER_URL}/ingredients/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const UpdateIngredientSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
});

export const updateIngredient = async ({
  id,
  ...updates
}: z.infer<typeof UpdateIngredientSchema>) => {
  const response = await fetch(`${JSON_SERVER_URL}/ingredients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return response.json();
};

const RecepeIngredientSchema = z.object({
  id: z.string(),
  quantity: z.number().optional(),
});

export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(RecepeIngredientSchema),
});

export const RecipeListSchema = z.array(RecipeSchema);

export const getRecipeList = async () => {
  const response = await fetch(`${JSON_SERVER_URL}/recipes`);
  const data = await response.json();
  return RecipeListSchema.parse(data);
};

export const getRecipe = async (id: string) => {
  const response = await fetch(`${JSON_SERVER_URL}/recipes/${id}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return RecipeSchema.parse(data);
};

export const addRecipe = async (recipe: z.infer<typeof RecipeSchema>) => {
  const existingRecipe = await getRecipe(recipe.id);
  if (existingRecipe) {
    throw new Error(`Recipe with id ${recipe.id} already exists`);
  }

  const response = await fetch(`${JSON_SERVER_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const data = await response.json();
  return RecipeSchema.parse(data);
};

export const deleteRecipe = async (id: string) => {
  const response = await fetch(`${JSON_SERVER_URL}/recipes/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const UpdateRecipeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  ingredients: z.array(RecepeIngredientSchema).optional(),
});

export const updateRecipe = async ({
  id,
  ...updates
}: z.infer<typeof UpdateRecipeSchema>) => {
  const response = await fetch(`${JSON_SERVER_URL}/recipes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return response.json();
};
