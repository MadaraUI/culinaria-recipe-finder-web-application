import React from "react";
import { Category } from "../utils/types";
interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}
export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex space-x-3 px-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-terracotta text-white shadow-md"
              : "bg-white text-gray-600 border border-stone-200 hover:border-terracotta hover:text-terracotta"
          }`}
        >
          All Recipes
        </button>

        {categories.map((category) => (
          <button
            key={category.idCategory}
            onClick={() => onSelectCategory(category.strCategory)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.strCategory
                ? "bg-terracotta text-white shadow-md"
                : "bg-white text-gray-600 border border-stone-200 hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
