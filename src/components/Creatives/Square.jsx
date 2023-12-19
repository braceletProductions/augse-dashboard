import React from "react";
import Image from "next/image";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";

function Square({ onDelete, onUpload, creatives }) {
  return (
    <div className="flex-1 w-full">
      <h2 className="text-white my-2">Main Creatives:</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {creatives.map((creative, index) => (
          <div className="bg-gray-200" key={index}>
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + creative.path}
              alt="Creative1"
              height="250"
              width="250"
            />
            <button
              className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
              onClick={() => onDelete(creative._id)}
            >
              <AiFillDelete />
              DELETE
            </button>
          </div>
        ))}
      </div>
      <button
        className="bg-white mt-4 text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
        onClick={() => onUpload("Main")}
      >
        <AiOutlineUpload />
        UPLOAD
      </button>
    </div>
  );
}

export default Square;
