import React from "react";
import { Search, Heart } from "lucide-react";
import { Link } from "react-router-dom";
interface EmptyStateProps {
  type: "search" | "favorites";
  query?: string;
}
export function EmptyState({ type, query }: EmptyStateProps) {
  if (type === "search") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-stone-100 p-6 rounded-full mb-6">
          <Search size={48} className="text-stone-400" />
        </div>
        <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
          No recipes found
        </h3>
        <p className="text-gray-600 max-w-md mb-8">
          We couldn't find any recipes matching "{query}". Try checking your
          spelling or using more general terms.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-hover transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <Heart size={48} className="text-terracotta/50" />
      </div>
      <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
        No favorites yet
      </h3>
      <p className="text-gray-600 max-w-md mb-8">
        Start building your personal cookbook by saving recipes you love. Look
        for the heart icon on any recipe.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-hover transition-colors"
      >
        Discover Recipes
      </Link>
    </div>
  );
}
