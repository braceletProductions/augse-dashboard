import axios from "axios";
import React, { useState } from "react";

const SpecialCouponForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: "",
    description: "",
    expiryDate: "",
    minPrice: "",
    otherValidations: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/rewards/add/coupon/special",
        formData
      );
      console.log(response.data);
      setFormData({
        code: "",
        discountPercentage: "",
        description: "",
        expiryDate: "",
        minPrice: "",
        otherValidations: [],
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
      <div className="w-full p-4 bg-white rounded-md shadow-md z-20">
        <h2 className="text-2xl font-bold mb-4">Create Special Coupon Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Code:
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Discount Percentage:
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Expiry Date:
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Minimum Price:
              <input
                type="number"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
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
      </div>
    </div>
  );
};

export default SpecialCouponForm;
