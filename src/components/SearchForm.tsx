import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SearchFormProps {
  onSearch: (ingredient: string) => void;
}

const validationSchema = Yup.object().shape({
  ingredient: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .required("Ingredient is required"),
});

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ ingredient: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSearch(values.ingredient);
        resetForm();
      }}
    >
      {() => (
        <Form className="flex gap-2">
          <Field
            name="ingredient"
            placeholder="Search ingredient"
            className="border rounded px-3 py-2 flex-grow"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded">
            Search
          </button>
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
