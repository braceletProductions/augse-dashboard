import React from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";

function UploadCreativeForm({ onSubmit, onClose }) {
  return (
    <CardWithBackDrop>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
          onClick={onSubmit}
        >
          Upload
        </button>
      </div>
    </CardWithBackDrop>
  );
}

export default UploadCreativeForm;
