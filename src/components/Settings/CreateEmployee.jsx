import axios from "axios";
import React, { useState } from "react";

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
    <div className="max-w-md fixed inset-0 flex items-center justify-center lg:w-[30rem] mx-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="p-4 bg-white rounded-md w-full shadow-md z-10">
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
      </div>
    </div>
  );
};

export default CreateEmployee;
