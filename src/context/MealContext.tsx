import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Meal } from "../types/meal";

// Define the shape of the context data
interface MealContextProps {
  favorites: Meal[];                     // List of favorite meals
  addFavorite: (meal: Meal) => void;     // Function to add a meal to favorites
  removeFavorite: (id: string) => void;  // Function to remove a meal from favorites by id
}

// Create the context with default empty implementations
export const MealContext = createContext<MealContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

// Provider component to wrap around parts of the app that need access to meal favorites
export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Meal[]>(() => {
    // Load initial favorites from localStorage (if any)
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save updated favorites list to localStorage on every change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a meal to favorites
  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => [...prev, meal]);
  };

  // Remove a meal from favorites by ID
  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== id));
  };

  return (
    // Provide the favorites list and functions to the context consumers
    <MealContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MealContext.Provider>
  );
};
