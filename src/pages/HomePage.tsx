import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";
import { LoadingGrid } from "../components/LoadingState";
import { api } from "../utils/api";
import { Category, Recipe } from "../utils/types";
import { ArrowRight, Sparkles } from "lucide-react";
export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, recipes] = await Promise.all([
          api.getCategories(),
          api.searchRecipes("chicken"), // Initial content
        ]);
        setCategories(cats.slice(0, 8)); // Show top 8 categories
        setFeaturedRecipes(recipes ? recipes.slice(0, 6) : []);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleRandomRecipe = async () => {
    try {
      const recipe = await api.getRandomRecipe();
      if (recipe) {
        navigate(`/recipe/${recipe.idMeal}`);
      }
    } catch (error) {
      console.error("Failed to get random recipe", error);
    }
  };
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
      className="min-h-screen pb-20"
    >
      {/* Hero Section */}
      <section className="relative bg-cream pt-12 pb-[98px] px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-terracotta/5 rounded-full blur-3xl" />
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-banner-image.jpg"
            alt="Culinary background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream/95 via-cream/90 to-cream/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sage/10 rounded-full blur-3xl z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl z-10" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium tracking-wide mb-6">
              DISCOVER CULINARY EXCELLENCE
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-bold text-charcoal mb-6 leading-10">
              Cook with <span className="text-terracotta ">Passion</span>,
              <br />
              Eat with Pleasure.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-8">
              Explore thousands of curated recipes from around the globe. Find
              your next favorite meal today.
            </p>
          </motion.div>

          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar />

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>Trending:</span>
              <button
                onClick={() => navigate("/search?q=pasta")}
                className="hover:text-terracotta underline decoration-terracotta/30"
              >
                Pasta
              </button>
              <button
                onClick={() => navigate("/search?q=curry")}
                className="hover:text-terracotta underline decoration-terracotta/30"
              >
                Curry
              </button>
              <button
                onClick={() => navigate("/search?q=vegan")}
                className="hover:text-terracotta underline decoration-terracotta/30"
              >
                Vegan
              </button>
              <button
                onClick={() => navigate("/search?q=dessert")}
                className="hover:text-terracotta underline decoration-terracotta/30"
              >
                Dessert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-18 mt-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display md:lg:text-3xl text-xl font-bold text-charcoal">
            Explore Categories
          </h2>
          <button
            onClick={() => navigate("/search")}
            className="text-terracotta font-medium flex items-center hover:text-terracotta-hover transition-colors"
          >
            View all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, idx) => (
            <motion.div
              key={category.idCategory}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: idx * 0.05,
              }}
              onClick={() =>
                navigate(`/search?category=${category.strCategory}`)
              }
              className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[16/9] shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold tracking-wide">
                  {category.strCategory}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-18 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display md:lg:text-3xl text-xl font-bold text-charcoal">
            Featured Recipes
          </h2>
          <button
            onClick={handleRandomRecipe}
            className="flex items-center space-x-2 px-4 py-2 bg-sage/10 text-sage rounded-full hover:bg-sage/20 transition-colors font-medium md:lg:text-lg text-base"
          >
            <Sparkles size={16} />
            <span>Surprise Me</span>
          </button>
        </div>

        {loading ? (
          <LoadingGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
