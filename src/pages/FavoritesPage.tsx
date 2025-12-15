import React from "react";
import { motion } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import { RecipeCard } from "../components/RecipeCard";
import { EmptyState } from "../components/EmptyState";
import { Heart } from "lucide-react";
export function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  if (!isLoaded) return null;
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="min-h-screen bg-cream pb-20"
    >
      <div className="bg-white border-b border-stone-200 pt-12 pb-8 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-terracotta/10 rounded-full text-terracotta">
              <Heart size={24} className="fill-current" />
            </div>
            <h1 className="font-display text-4xl font-bold text-charcoal">
              My Cookbook
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl text-lg">
            Your personal collection of culinary inspiration. {favorites.length}{" "}
            {favorites.length === 1 ? "recipe" : "recipes"} saved.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {favorites.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {favorites.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </motion.div>
        ) : (
          <EmptyState type="favorites" />
        )}
      </div>
    </motion.div>
  );
}
