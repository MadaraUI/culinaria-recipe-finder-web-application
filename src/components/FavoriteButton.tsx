import React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
}
export function FavoriteButton({
  isFavorite,
  onClick,
  className = "",
  size = 20,
}: FavoriteButtonProps) {
  return (
    <motion.button
      whileTap={{
        scale: 0.8,
      }}
      onClick={onClick}
      className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
        isFavorite
          ? "bg-terracotta/10 text-terracotta hover:bg-terracotta/20"
          : "bg-white/80 text-gray-400 hover:text-terracotta hover:bg-white"
      } ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isFavorite ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <Heart
          size={size}
          className={isFavorite ? "fill-current" : ""}
          strokeWidth={2}
        />
      </motion.div>
    </motion.button>
  );
}
