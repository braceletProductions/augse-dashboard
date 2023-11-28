import React, { useState } from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";

const options = ["DEFER_DLV", "EDIT_DETAILS", "RE-ATTEMPT"];

function NDRForm({ onClose }) {
  const [formData, setFormData] = useState({
    act: "DEFER_DLV",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <CardWithBackDrop onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">NDR Action API</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-2 w-full">
          <label className="block text-gray-700 ml-1 text-sm font-bold mb-2">
            Action
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="act"
              name="act"
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Action
              </option>
              {options.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="pointer-events-none absolute top-2 right-4 inset-y-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12.582l-6.293-6.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 1 0-1.414-1.414L10 12.582z" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </CardWithBackDrop>
  );
}

export default NDRForm;
