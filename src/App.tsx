import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import MealDetail from "./pages/MealDetail";
import Search from "./pages/Search";
import { MealProvider } from "./context/MealContext";

const App = () => {
  return (
    <MealProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </MealProvider>
  );
};

export default App;
