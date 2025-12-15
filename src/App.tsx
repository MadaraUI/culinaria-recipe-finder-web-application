import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </AnimatePresence>
  );
}
export function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-terracotta/20 flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </Router>
  );
}
