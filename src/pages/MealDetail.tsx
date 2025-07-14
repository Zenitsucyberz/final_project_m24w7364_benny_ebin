import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealDetail } from "../utils/api";
import type { Meal } from "../types/meal";

const MealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getMealDetail(id)
        .then((res) => setMeal(res.data.meals[0]))
        .catch(() => setMeal(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!meal) return <p className="text-center mt-10">Meal not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/meals" className="text-blue-600 underline mb-4 inline-block">
        &larr; Back to Meals
      </Link>
      <h2 className="text-3xl font-bold mb-4">{meal.strMeal}</h2>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded mb-6"
      />
      <p className="mb-4"><strong>Category:</strong> {meal.strCategory}</p>
      <p className="mb-4"><strong>Area:</strong> {meal.strArea}</p>
      <p className="mb-4 whitespace-pre-line">{meal.strInstructions}</p>
      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default MealDetail;
