export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}
export interface RecipeDetail extends Recipe {
  strInstructions: string;
  strYoutube?: string;
  strTags?: string;
  strSource?: string;
  [key: string]: string | undefined; // For dynamic ingredient/measure keys
}
export interface FormattedIngredient {
  ingredient: string;
  measure: string;
}
export interface SearchState {
  query: string;
  results: Recipe[];
  loading: boolean;
  error: string | null;
}