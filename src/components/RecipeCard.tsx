import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Recipe } from "../utils/types";
import { FavoriteButton } from "./FavoriteButton";
import { useFavorites } from "../contexts/FavoritesContext";
interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}
export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.idMeal);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
    >
      <Link to={`/recipe/${recipe.idMeal}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          {recipe.strCategory && (
            <span className="inline-block px-2 py-1 mb-2 text-xs font-medium tracking-wider text-sage uppercase bg-sage/10 rounded-md">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="inline-block ml-2 px-2 py-1 mb-2 text-xs font-medium tracking-wider text-stone-500 uppercase bg-stone-100 rounded-md">
              {recipe.strArea}
            </span>
          )}

          <h3 className="font-display text-xl font-bold text-charcoal leading-tight group-hover:text-terracotta transition-colors duration-300 line-clamp-2">
            {recipe.strMeal}
          </h3>
        </div>
      </Link>

      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton
          isFavorite={favorite}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
        />
      </div>
    </motion.div>
  );
}
