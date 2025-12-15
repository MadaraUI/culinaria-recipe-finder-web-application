import React, { useState, Component } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal";
}
export function SearchBar({
  initialQuery = "",
  placeholder = "Search for recipes (e.g., 'Pasta', 'Chicken')...",
  className = "",
  variant = "default",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  const clearSearch = () => {
    setQuery("");
    // Optional: focus input after clearing
  };
  const baseStyles = "relative w-full transition-all duration-300";
  const inputStyles =
    variant === "default"
      ? `w-full pl-12 pr-12 py-4 bg-white border-2 rounded-full text-lg outline-none transition-all duration-300 placeholder:text-gray-400 ${
          isFocused
            ? "border-terracotta shadow-lg ring-4 ring-terracotta/10"
            : "border-transparent shadow-md hover:shadow-lg"
        }`
      : `w-full pl-10 pr-10 py-2 bg-stone-100 border border-transparent rounded-lg text-base outline-none transition-all duration-300 focus:bg-white focus:border-terracotta focus:ring-2 focus:ring-terracotta/10`;
  const iconColor = isFocused ? "text-terracotta" : "text-gray-400";
  return (
    <form onSubmit={handleSubmit} className={`${baseStyles} ${className}`}>
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${iconColor} ${
          variant === "minimal" ? "w-4 h-4 left-3" : "w-6 h-6"
        }`}
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`${inputStyles} text-charcoal`}
      />

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100 text-gray-400 hover:text-charcoal transition-colors ${
            variant === "minimal" ? "right-2" : ""
          }`}
        >
          <X size={variant === "minimal" ? 14 : 18} />
        </button>
      )}
    </form>
  );
}
