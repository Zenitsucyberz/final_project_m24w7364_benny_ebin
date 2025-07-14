import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Define the Meal interface for the data structure
interface Meal {
  id: number;
  name: string;
  calories: number;
}

// Initial list of meals to display if nothing exists in localStorage
const initialMeals: Meal[] = [
  { id: 1, name: 'Chicken Salad', calories: 350 },
  { id: 2, name: 'Beef Steak', calories: 700 },
  { id: 3, name: 'Veggie Wrap', calories: 400 },
  { id: 4, name: 'Fruit Smoothie', calories: 250 },
];

// Form component to allow users to add new meals
const MealForm: React.FC<{ onAddMeal: (meal: Omit<Meal, 'id'>) => void }> = ({ onAddMeal }) => {
  const formik = useFormik({
    initialValues: { name: '', calories: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Meal name required').min(2, 'Too short!'),
      calories: Yup.number()
        .required('Calories required')
        .min(1, 'Must be at least 1 calorie')
        .typeError('Calories must be a number'),
    }),
    onSubmit: (values, { resetForm }) => {
      onAddMeal({ name: values.name.trim(), calories: Number(values.calories) });
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Meal</h2>

      {/* Meal Name Field */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Meal Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            formik.touched.name && formik.errors.name
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Enter meal name"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Calories Field */}
      <div className="mb-6">
        <label htmlFor="calories" className="block mb-1 font-medium text-gray-700">
          Calories
        </label>
        <input
          id="calories"
          name="calories"
          type="number"
          min={1}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            formik.touched.calories && formik.errors.calories
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.calories}
          placeholder="Enter calorie amount"
        />
        {formik.touched.calories && formik.errors.calories && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.calories}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Add Meal
      </button>
    </form>
  );
};

// Main Table Page component
const TablePage: React.FC = () => {
  // ✅ Load meals from localStorage or fall back to default meals
  const [meals, setMeals] = useState<Meal[]>(() => {
    const stored = localStorage.getItem("meals");
    return stored ? JSON.parse(stored) : initialMeals;
  });

  // ✅ Save meals to localStorage when state updates
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  // Function to add new meal with auto-incremented ID
  const addMeal = (meal: Omit<Meal, 'id'>) => {
    setMeals((prev) => [
      ...prev,
      { ...meal, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  // Define columns for TanStack Table
  const columns: ColumnDef<Meal>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Meal Name' },
    { accessorKey: 'calories', header: 'Calories' },
  ];

  // Create table instance
  const table = useReactTable({
    data: meals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-8">
      <div className="flex flex-col md:flex-row gap-10 max-w-7xl w-full justify-center">
        {/* Left: Form */}
        <MealForm onAddMeal={addMeal} />

        {/* Right: Table */}
        <table className="min-w-[600px] border-collapse border border-gray-300 rounded-lg shadow-md bg-white">
          <thead className="bg-blue-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 p-3 text-left font-semibold text-blue-900"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-gray-500">
                  No meals added yet.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="even:bg-white odd:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-300 p-3 text-gray-800"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
