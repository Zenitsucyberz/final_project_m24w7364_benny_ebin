export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: any;
}
