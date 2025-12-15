import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-terracotta text-white p-2 rounded-full transform group-hover:rotate-12 transition-transform duration-300">
              <ChefHat size={24} />
            </div>
            <span className="font-display text-2xl font-bold text-charcoal tracking-tight">
              Culinaria
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-terracotta"
                  : "text-charcoal hover:text-terracotta"
              }`}
            >
              Discover
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                isActive("/favorites")
                  ? "text-terracotta"
                  : "text-charcoal hover:text-terracotta"
              }`}
            >
              <span>Favorites</span>
              {isActive("/favorites") && (
                <Heart size={14} className="fill-current" />
              )}
            </Link>
            <button
              onClick={() => navigate("/search")}
              className="p-2 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-stone-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-charcoal hover:text-terracotta transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-lg ${
                  isActive("/")
                    ? "bg-stone-50 text-terracotta"
                    : "text-charcoal hover:bg-stone-50"
                }`}
              >
                Discover
              </Link>
              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-lg ${
                  isActive("/favorites")
                    ? "bg-stone-50 text-terracotta"
                    : "text-charcoal hover:bg-stone-50"
                }`}
              >
                Favorites
              </Link>
              <Link
                to="/search"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-lg ${
                  isActive("/search")
                    ? "bg-stone-50 text-terracotta"
                    : "text-charcoal hover:bg-stone-50"
                }`}
              >
                Search Recipes
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
