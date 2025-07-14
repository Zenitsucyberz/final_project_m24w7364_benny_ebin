import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Meal Planner
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Browse delicious meals and save your favorites.
        </p>
        <div className="space-x-4">
          <Link
            to="/meals"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow transition"
          >
            Browse Meals
          </Link>
          <Link
            to="/search"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow transition"
          >
            Search by Ingredient
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
