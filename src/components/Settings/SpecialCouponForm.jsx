import React, { useState } from "react";

const SpecialCouponForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
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
  );
};

export default SpecialCouponForm;
