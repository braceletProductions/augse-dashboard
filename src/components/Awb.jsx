import React, { useState } from "react";

const AWBPopup = ({ onClose, onSubmit }) => {
  const [awb1, setAWB1] = useState("");
  const [awb2, setAWB2] = useState("");

  const handleAWBChange = (e, setAWB) => {
    setAWB(e.target.value);
  };

  const handleSubmit = () => {
    if (awb1 === awb2) {
      onSubmit(awb1);
      onClose();
    } else {
      alert("AWB codes do not match. Please enter them again.");
      setAWB1("");
      setAWB2("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10 w-96">
        <span
          className="cursor-pointer absolute top-0 right-0 p-4"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl mb-4 font-bold text-gray-800">
          Enter AWB Code
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">AWB Code:</label>
          <input
            type="text"
            value={awb1}
            onChange={(e) => handleAWBChange(e, setAWB1)}
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">
            Confirm AWB Code:
          </label>
          <input
            type="text"
            value={awb2}
            onChange={(e) => handleAWBChange(e, setAWB2)}
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AWBPopup;
