import axios from "axios";
import React, { useState } from "react";
import CardWithBackDrop from "./CardWithBackDrop";

const CreateEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    adminType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/user/employee/register",
        formData
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        adminType: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithBackDrop onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Phone:</span>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Employee Type:</span>
          <select
            name="adminType"
            value={formData.adminType}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="customer">Procurement</option>
            <option value="accounts">Accounts</option>
            <option value="sales">Sales</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </CardWithBackDrop>
  );
};

export default CreateEmployee;
