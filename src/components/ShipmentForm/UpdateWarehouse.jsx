import React, { useState } from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";

function UpdateWarehouse({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    registered_name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithBackDrop onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Update Warehouse
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Pincode:
            <input
              type="text"
              name="pin"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Mobile Number:
            <input
              type="text"
              name="phone"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Registered Name:
            <input
              type="text"
              name="registered_name"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address:
            <input
              type="text"
              name="address"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </label>
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

export default UpdateWarehouse;
