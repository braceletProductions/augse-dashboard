import React from "react";
import CardWithBackDrop from "./Settings/CardWithBackDrop";
import axios from "axios";

const ConfirmDeleteOrder = ({ orderId, onCancel }) => {
  const confirmDelete = async () => {
    try {
      const response = axios.delete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithBackDrop>
      <p className="text-lg text-gray-800 mb-4">
        Are you sure you want to delete order #{orderId}?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
          onClick={confirmDelete}
        >
          Confirm Delete
        </button>
      </div>
    </CardWithBackDrop>
  );
};

export default ConfirmDeleteOrder;
