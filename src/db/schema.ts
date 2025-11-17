import z from "zod";

export const IngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  unit: z.enum(["kg", "pcs", "g", "ml", "l"]),
});

export const IngredientListSchema = z.array(IngredientSchema);

export const UpdateIngredientSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  unit: z.string().optional(),
});

export const RecepeIngredientSchema = z.object({
  id: z.string(),
  quantity: z.number().optional(),
});

export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(RecepeIngredientSchema),
});

export const RecipeListSchema = z.array(RecipeSchema);

export const UpdateRecipeSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  ingredients: z.array(RecepeIngredientSchema).optional(),
});
