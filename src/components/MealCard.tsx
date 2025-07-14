import React, { useContext } from "react";
import type { Meal } from "../types/meal";
import { MealContext } from "../context/MealContext";

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(MealContext);
  const isFavorite = favorites.some((m) => m.idMeal === meal.idMeal);

  return (
    <div className="border rounded shadow p-4 max-w-sm">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded" />
      <h2 className="text-xl font-semibold mt-2">{meal.strMeal}</h2>
      <p className="text-gray-600">{meal.strCategory} - {meal.strArea}</p>
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
