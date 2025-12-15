import { Category, Recipe, RecipeDetail } from './types';
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const api = {
  // Search recipes by name
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes. Please check your internet connection.');
    }
  },
  // Search recipes by main ingredient
  searchByIngredient: async (ingredient: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching by ingredient:', error);
      throw new Error('Failed to search by ingredient. Please check your internet connection.');
    }
  },
  // Smart search: tries name first, then ingredient
  smartSearch: async (query: string): Promise<{
    recipes: Recipe[];
    searchType: 'name' | 'ingredient' | 'both';
  }> => {
    try {
      // Try searching by name first
      const nameResults = await api.searchRecipes(query);
      if (nameResults.length > 0) {
        return {
          recipes: nameResults,
          searchType: 'name'
        };
      }

      // If no name results, try ingredient search
      const ingredientResults = await api.searchByIngredient(query);
      if (ingredientResults.length > 0) {
        return {
          recipes: ingredientResults,
          searchType: 'ingredient'
        };
      }
      return {
        recipes: [],
        searchType: 'name'
      };
    } catch (error) {
      console.error('Error in smart search:', error);
      return {
        recipes: [],
        searchType: 'name'
      };
    }
  },
  // Filter by category
  filterByCategory: async (category: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error filtering by category:', error);
      throw new Error('Failed to filter recipes. Please check your internet connection.');
    }
  },
  // Get recipe details by ID
  getRecipeById: async (id: string): Promise<RecipeDetail | null> => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw new Error('Failed to fetch recipe details. Please check your internet connection.');
    }
  },
  // Get random recipe
  getRandomRecipe: async (): Promise<RecipeDetail | null> => {
    try {
      const response = await fetch(`${BASE_URL}/random.php`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      throw new Error('Failed to fetch random recipe. Please check your internet connection.');
    }
  },
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${BASE_URL}/categories.php`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories. Please check your internet connection.');
    }
  }
};

// Helper to extract ingredients and measures from the flat API structure
export const getIngredients = (recipe: RecipeDetail): {
  ingredient: string;
  measure: string;
}[] => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  return ingredients;
};