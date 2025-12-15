import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../utils/api";
import { Recipe, Category } from "../utils/types";
import { RecipeCard } from "../components/RecipeCard";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { LoadingGrid } from "../components/LoadingState";
import { EmptyState } from "../components/EmptyState";
export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [searchType, setSearchType] = useState<
    "name" | "ingredient" | "both" | null
  >(null);
  // Fetch categories on mount
  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);
  // Sync state with URL param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  // Fetch recipes when query or category changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setSearchType(null);
      try {
        let results: Recipe[] = [];
        if (selectedCategory) {
          // Filter by category
          results = await api.filterByCategory(selectedCategory);
          // If there's also a query, filter the category results locally
          if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter((r) =>
              r.strMeal.toLowerCase().includes(lowerQuery)
            );
          }
        } else if (query) {
          // Use smart search (name + ingredient fallback)
          const searchResult = await api.smartSearch(query);
          results = searchResult.recipes;
          setSearchType(searchResult.searchType);
        } else {
          // Default: show some popular recipes
          results = await api.searchRecipes("chicken");
        }
        setRecipes(results || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [query, selectedCategory]);
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    // Update URL without refreshing
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
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
      className="min-h-screen bg-cream pb-20"
    >
      <div className="bg-white border-b border-stone-200 pt-8 pb-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
              {query
                ? `Results for "${query}"`
                : selectedCategory
                ? `${selectedCategory} Recipes`
                : "Explore Recipes"}
            </h1>
            {searchType === "ingredient" && query && (
              <p className="text-sm text-gray-600 mb-3">
                Showing recipes with{" "}
                <span className="font-semibold text-terracotta">{query}</span>{" "}
                as an ingredient
              </p>
            )}
            <SearchBar initialQuery={query} variant="minimal" />
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <LoadingGrid />
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={idx} />
            ))}
          </div>
        ) : (
          <EmptyState type="search" query={query} />
        )}
      </div>
    </motion.div>
  );
}
