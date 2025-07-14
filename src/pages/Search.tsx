import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import { searchMealsByIngredient } from "../utils/api";
import type { Meal } from "../types/meal";
import MealCard from "../components/MealCard";

const Search = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = (ingredient: string) => {
        setLoading(true);
        setError("");
        searchMealsByIngredient(ingredient)
            .then((res) => {
                if (res.data.meals) {
                    setMeals(res.data.meals);
                } else {
                    setMeals([]);
                    setError("No meals found for that ingredient.");
                }
            })
            .catch(() => {
                setError("Failed to fetch meals.");
                setMeals([]);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Search Meals by Ingredient</h2>
            <SearchForm onSearch={handleSearch} />
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {meals.map
                    ((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
            </div>
        </div>
    );
};

export default Search;