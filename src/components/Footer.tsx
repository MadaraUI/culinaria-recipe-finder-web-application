import React from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Instagram,
  Twitter,
  Github,
  ExternalLink,
  Facebook,
} from "lucide-react";
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-stone-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-terracotta text-white p-2 rounded-full transform group-hover:rotate-12 transition-transform duration-300">
                <ChefHat size={24} />
              </div>
              <span className="font-display text-2xl font-bold text-charcoal">
                Culinaria
              </span>
            </Link>
            <p className="text-gray-600 max-w-sm mb-4 leading-relaxed">
              Your gateway to culinary inspiration. Discover, save, and create
              delicious meals from around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-terracotta transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-terracotta transition-colors"
                aria-label="GitHub"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold text-charcoal mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  Discover Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-lg font-bold text-charcoal mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-terracotta transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © {currentYear} Culinaria. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <a
              href="https://madara-perera-azure-nu-86.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:text-terracotta-hover transition-colors"
            >
              Madara Perera
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
