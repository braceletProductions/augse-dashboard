import axios from "axios";
import React, { useState } from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";

function PickupRequestForm({ onClose }) {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    expectedPackageCount: "",
    pickupDate: "",
    pickupTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, pickupTime: formData.pickupTime + ":00" };
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/shipping/pickup",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithBackDrop onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Pickup Request Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="pickupLocation">Location:</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex gap-2 mb-2 w-full">
          <div className="flex-1 mb-2">
            <label htmlFor="pickupDate">Date:</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex-1 mb-2">
            <label htmlFor="pickupTime">Time:</label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex-1 mb-2">
            <label htmlFor="expectedPackageCount">Packages:</label>
            <input
              type="text"
              id="expectedPackageCount"
              name="expectedPackageCount"
              value={formData.expectedPackageCount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </CardWithBackDrop>
  );
}

export default PickupRequestForm;
