import React, { useContext } from "react";
import type { Meal } from "../types/meal";
import { MealContext } from "../context/MealContext";

// Define the props for the MealCard component
interface MealCardProps {
  meal: Meal; // A single meal object passed to the card
}

// Functional component for displaying a meal in card format
const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  // Get favorites and add/remove functions from MealContext
  const { favorites, addFavorite, removeFavorite } = useContext(MealContext);

  // Check if the current meal is already in favorites
  const isFavorite = favorites.some((m) => m.idMeal === meal.idMeal);

  return (
    <div className="border rounded shadow p-4 max-w-sm">
      {/* Meal image */}
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded" />

      {/* Meal name */}
      <h2 className="text-xl font-semibold mt-2">{meal.strMeal}</h2>

      {/* Category and origin (area) info */}
      <p className="text-gray-600">{meal.strCategory} - {meal.strArea}</p>

      {/* Button to add or remove from favorites */}
      <button
        onClick={() =>
          isFavorite ? removeFavorite(meal.idMeal) : addFavorite(meal)
        }
        className={`mt-4 px-4 py-2 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MealCard;
