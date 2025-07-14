import React, { useEffect, useState } from "react";
import { getMealsByCategory } from "../utils/api";
import type { Meal } from "../types/meal";
import MealTable from "../components/MealTable";

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory("Seafood")
      .then((res) => setMeals(res.data.meals))
      .catch(() => setMeals([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Meal Planner</h2>
      <MealTable meals={meals} />
    </div>
  );
};

export default Meals;
