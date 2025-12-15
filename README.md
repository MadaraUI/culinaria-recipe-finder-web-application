# Culinaria - Interactive Recipe Finder Web Application

A sophisticated, modern recipe discovery web application built with React, TypeScript, and Tailwind CSS. Culinaria provides an elegant interface for exploring, searching, and saving recipes from around the world.

## Design Rationale

### Target User

Home cooks and food enthusiasts seeking culinary inspiration. Users who value:

- Beautiful, intuitive interfaces
- Quick recipe discovery
- Easy organization of favorite recipes
- Seamless cross-device experience

### UI/UX Design Decisions

**1. Modern Culinary Elegance Aesthetic**

- Moved away from generic "AI slop" aesthetics (purple gradients, overused fonts)
- Inspired by high-end food magazines (Bon Appétit, Kinfolk)
- Warm, inviting color palette that complements food photography
- Editorial typography creates a sophisticated, trustworthy feel

**2. Color System**

- **Cream (#FDFBF7)**: Main background - soft, warm, non-fatiguing
- **Terracotta (#D4735E)**: Primary accent - warm, appetizing, distinctive
- **Sage (#8B9D83)**: Secondary accent - natural, calming for categories
- **Charcoal (#2D2D2D)**: Text - high contrast without harsh black

**3. Typography Hierarchy**

- **Playfair Display**: Headings - editorial sophistication, culinary elegance
- **Inter**: Body text - exceptional readability, modern clarity
- Clear type scale ensures scannable content hierarchy

**4. Layout & Spacing**

- Generous whitespace reduces cognitive load
- Large, beautiful food photography as hero elements
- Card-based design for easy scanning
- Responsive grid adapts gracefully across devices

**5. Motion Design Philosophy**

- **Purposeful, not decorative**: Every animation serves user understanding
- Page transitions provide spatial context
- Staggered card animations create rhythm and polish
- Favorite button animation provides satisfying feedback
- Loading states feel designed, not generic

## Features Implemented

### Core Features

- **Recipe Search**: Search by recipe name or main ingredient
- **Recipe Details**: Full recipe view with ingredients, instructions, and metadata
- **Favorites System**: Save recipes with localStorage persistence (instant updates, no refresh needed)
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop

### Bonus Features (All Implemented)

#### Advanced Filtering

- Category-based filtering (Beef, Chicken, Dessert, Seafood, Vegetarian, etc.)
- Cuisine-based filtering (Italian, Mexican, Indian, Chinese, etc.)
- Horizontal scrolling filter chips for easy navigation
- Combined search + filter functionality

#### Micro-interactions & Animations

- **Page Transitions**: Smooth fade + slide animations using Framer Motion
- **Staggered Card Entrance**: Recipe cards animate in with 100ms stagger
- **Favorite Button**: Scale animation with spring physics on toggle
- **Search Focus**: Elegant ring glow on input focus
- **Image Loading**: Graceful fade-in for recipe images
- **Hover States**: Thoughtful hover effects only on interactive elements

#### Accessibility (a11y)

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<article>`, `<section>`
- **ARIA Labels**: All icon-only buttons have descriptive labels
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Alt Text**: All recipe images include descriptive alt text
- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Focus Management**: Logical tab order and focus indicators
- **Screen Reader Support**: Meaningful content structure

#### Random Recipe

- "Surprise Me!" button on homepage
- Fetches random recipe from API
- Instant navigation to recipe detail page
- Encourages serendipitous discovery

## Tech Stack

### Core Technologies

- **React 18** - UI library
- **TypeScript** - Type safety and developer experience
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### Additional Libraries

- **Lucide React** - Beautiful, consistent icon set
- **TheMealDB API** - Recipe data source (free, no API key required)

### Development Tools

- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality
- **PostCSS** - CSS processing

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MadaraUI/culinaria-recipe-finder-web-application.git
   cd culinaria
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The app will automatically reload on code changes

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🔌 API Integration

### TheMealDB API

Culinaria uses [TheMealDB](https://www.themealdb.com) - a free, open recipe database.

**API Documentation:** [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

**Endpoints Used:**

- Search by name: `/search.php?s={query}`
- Search by ingredient: `/filter.php?i={ingredient}`
- Filter by category: `/filter.php?c={category}`
- Get recipe details: `/lookup.php?i={id}`
- Get random recipe: `/random.php`
- List categories: `/categories.php`

**No API Key Required** - TheMealDB offers a free tier with no authentication needed.

### Data Structure

```typescript
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface RecipeDetail extends Recipe {
  strInstructions: string;
  strIngredient1-20: string;
  strMeasure1-20: string;
  strYoutube?: string;
  strTags?: string;
}
```

## Accessibility Considerations

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Landmark regions (`<nav>`, `<main>`, `<footer>`)
- Semantic elements (`<article>`, `<section>`, `<button>`)

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order throughout the application
- Visible focus indicators (ring-2 ring-terracotta)
- Escape key closes mobile menu

### Screen Reader Support

- Descriptive alt text for all images
- ARIA labels for icon-only buttons
- Meaningful link text (no "click here")
- Status messages for loading/error states

### Visual Accessibility

- Color contrast ratios exceed WCAG AA (4.5:1)
- Text remains readable at 200% zoom
- Focus indicators are clearly visible
- No information conveyed by color alone

### Testing Recommendations

- Test with keyboard only (no mouse)
- Use screen reader (NVDA, JAWS, VoiceOver)
- Verify with browser accessibility tools
- Test at different zoom levels

## Challenges & Solutions

### Challenge 1: API Response Structure

**Problem**: TheMealDB returns ingredients and measures as separate numbered fields (strIngredient1, strMeasure1, etc.) rather than an array.

**Solution**: Created a helper function `getIngredients()` that iterates through 20 possible ingredient fields, filters out empty values, and returns a clean array of ingredient objects.

```typescript
export const getIngredients = (recipe: RecipeDetail) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient?.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }
  return ingredients;
};
```

### Challenge 2: Favorites Persistence & Real-time Updates

**Problem**: Need to persist favorites across browser sessions AND ensure instant UI updates without page refresh.

**Solution**: Implemented React Context API with `FavoritesProvider` for centralized state management. All components share the same favorites state, ensuring instant reactivity when adding/removing favorites. localStorage provides persistence across sessions.

### Challenge 3: Search + Filter Combination

**Problem**: Users want to both search by name AND filter by category simultaneously.

**Solution**: Implemented smart search that tries name search first, then falls back to ingredient search. When combined with category filters, results are fetched by category then filtered locally by search query.

### Challenge 4: Performance with Large Recipe Lists

**Problem**: Rendering hundreds of recipe cards could cause performance issues.

**Solution**:

- Implemented staggered animations with reasonable limits
- Used `loading="lazy"` for images
- Optimized re-renders with proper React keys
- Limited initial results to prevent overwhelming UI

### Challenge 5: Mobile Navigation

**Problem**: Full navigation doesn't fit on mobile screens.

**Solution**: Created responsive mobile menu with Framer Motion animations, hamburger icon, and overlay pattern. Menu closes automatically on route change.
