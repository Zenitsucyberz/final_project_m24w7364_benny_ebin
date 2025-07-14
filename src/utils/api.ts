import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMealsByCategory = async (category: string) => {
  return axios.get(`${BASE_URL}/filter.php?c=${category}`);
};

export const getMealDetail = async (id: string) => {
  return axios.get(`${BASE_URL}/lookup.php?i=${id}`);
};

export const searchMealsByIngredient = async (ingredient: string) => {
  return axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
};
