import React, { useState } from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";
import CheckedCheckBox from "../SVGComponents/CheckedCheckBox";
import UnCheckedCheckBox from "../SVGComponents/UnCheckedCheckBox";
import axios from "axios";

function NDRStatus({ onClose }) {
  const [formData, setFormData] = useState({
    upl: "",
    verbose: false,
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
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/shipping/ndr_status/" +
          formData.upl +
          "/" +
          formData.verbose
          ? "true"
          : "false",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithBackDrop onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">NDR Action API</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            UPL:
          </label>
          <input
            type="text"
            id="upl"
            name="upl"
            value={formData.upl}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div
          className="flex gap-4"
          onClick={() =>
            setFormData((prev) => ({ verbose: !prev.verbose, upl: prev.upl }))
          }
        >
          <div>
            {formData.verbose ? <CheckedCheckBox /> : <UnCheckedCheckBox />}
          </div>
          <div>Verbose</div>
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

export default NDRStatus;
