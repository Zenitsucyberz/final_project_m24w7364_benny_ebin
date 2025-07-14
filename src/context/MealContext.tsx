import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Meal } from "../types/meal";

interface MealContextProps {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
}

export const MealContext = createContext<MealContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Meal[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Update localStorage whenever favorites changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => [...prev, meal]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== id));
  };

  return (
    <MealContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MealContext.Provider>
  );
};