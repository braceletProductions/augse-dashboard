import React, { useState, useRef, useEffect } from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";
import Image from "next/image";

function UploadCreativeForm({ onSubmit, onClose, loading }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!selectedFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const handleFileInputChange = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <CardWithBackDrop>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Upload Creative</h2>
        {selectedFile && (
          <Image
            src={previewUrl}
            height="100"
            width="100"
            alt="Preview"
            className="my-4"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          className="hidden"
        />

        <button
          className="bg-green-500 my-4 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          Select Image
        </button>

        <div className="w-full flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
            onClick={() => onSubmit(selectedFile)}
            disabled={loading}
          >
            Upload
          </button>
        </div>
      </div>
    </CardWithBackDrop>
  );
}

export default UploadCreativeForm;
