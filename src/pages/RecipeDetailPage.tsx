import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Tag, PlayCircle } from "lucide-react";
import { api, getIngredients } from "../utils/api";
import { RecipeDetail } from "../utils/types";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../contexts/FavoritesContext";
import { LoadingDetail } from "../components/LoadingState";
export function RecipeDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => {
    if (id) {
      api
        .getRecipeById(id)
        .then(setRecipe)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);
  if (loading)
    return (
      <div className="pt-20">
        <LoadingDetail />
      </div>
    );
  if (!recipe) return <div className="pt-32 text-center">Recipe not found</div>;
  const ingredients = getIngredients(recipe);
  const instructions = recipe.strInstructions
    .split(/\r\n|\n/)
    .filter((line) => line.trim() !== "");
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
      className="min-h-screen bg-white pb-20"
    >
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 sm:left-8 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-cream rounded-3xl shadow-xl p-6 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {recipe.strCategory && (
                  <span className="px-3 py-1 bg-sage/10 text-sage rounded-full text-sm font-medium">
                    {recipe.strCategory}
                  </span>
                )}
                {recipe.strArea && (
                  <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-medium flex items-center">
                    <Globe size={14} className="mr-1" /> {recipe.strArea}
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight">
                {recipe.strMeal}
              </h1>
            </div>
            <FavoriteButton
              isFavorite={isFavorite(recipe.idMeal)}
              onClick={() => toggleFavorite(recipe)}
              size={28}
              className="mt-2"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {/* Sidebar: Ingredients */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                <h3 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center">
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {ingredients.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm md:text-base text-gray-700 pb-3 border-b border-stone-100 last:border-0 last:pb-0"
                    >
                      <span className="font-semibold mr-2 text-terracotta">
                        •
                      </span>
                      <span>
                        <span className="font-semibold text-charcoal">
                          {item.measure}
                        </span>{" "}
                        {item.ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {recipe.strTags && (
                <div className="flex flex-wrap gap-2">
                  {recipe.strTags.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-stone-100 text-stone-500 rounded-full text-xs font-medium flex items-center"
                    >
                      <Tag size={12} className="mr-1" /> {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content: Instructions */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Instructions
                </h3>
                <div className="space-y-6">
                  {instructions.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold font-display">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* {recipe.strYoutube && (
                <div className="pt-6 border-t border-stone-200">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <PlayCircle size={24} />
                    <span>Watch Video Tutorial</span>
                  </a>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
