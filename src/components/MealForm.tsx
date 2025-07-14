import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface MealFormValues {
  name: string;
  calories: number | '';
}

const MealForm: React.FC = () => {
  const formik = useFormik<MealFormValues>({
    initialValues: {
      name: '',
      calories: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Meal name is required')
        .min(2, 'Too short!'),
      calories: Yup.number()
        .required('Calories are required')
        .min(1, 'Must be at least 1 calorie')
        .typeError('Calories must be a number'),
    }),
    onSubmit: (values) => {
      alert(`Meal Added: ${values.name} with ${values.calories} calories`);
      // Here you can add your logic to save meal, update state, etc.
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-1">Meal Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="calories" className="block font-semibold mb-1">Calories</label>
        <input
          id="calories"
          name="calories"
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.calories}
        />
        {formik.touched.calories && formik.errors.calories ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.calories}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Add Meal
      </button>
    </form>
  );
};

export default MealForm;
