import React, { useEffect, useState, createContext, useContext } from "react";
import { Recipe } from "../utils/types";
interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
  isLoaded: boolean;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("culinary_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);
  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("culinary_favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);
  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.idMeal === recipe.idMeal)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  };
  const isFavorite = (id: string) => {
    return favorites.some((recipe) => recipe.idMeal === id);
  };
  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
