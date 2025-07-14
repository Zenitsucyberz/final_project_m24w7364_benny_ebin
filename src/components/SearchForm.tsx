import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Props type definition for the SearchForm component
interface SearchFormProps {
  onSearch: (ingredient: string) => void; // Function to handle search submit
}

// Form validation schema using Yup
const validationSchema = Yup.object().shape({
  ingredient: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed") // Only letters allowed
    .required("Ingredient is required"), // Ingredient field must not be empty
});

// Functional component for the search form
const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ ingredient: "" }}           // Initial form values
      validationSchema={validationSchema}          // Apply Yup validation
      onSubmit={(values, { resetForm }) => {
        onSearch(values.ingredient);               // Call the onSearch handler
        resetForm();                               // Clear form after submission
      }}
    >
      {/* Render prop pattern from Formik */}
      {() => (
        <Form className="flex gap-2">
          {/* Input field for ingredient */}
          <Field
            name="ingredient"
            placeholder="Search ingredient"
            className="border rounded px-3 py-2 flex-grow"
          />

          {/* Submit button */}
          <button type="submit" className="bg-blue-600 text-white px-4 rounded">
            Search
          </button>

          {/* Display validation error message if any */}
          <ErrorMessage
            name="ingredient"
            component="div"
            className="text-red-600 text-sm mt-1"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
