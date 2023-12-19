import React from "react";
import Image from "next/image";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";

function Square({ onDelete, onUpload }) {
  return (
    <div className="flex-1 w-full">
      <h2 className="text-white my-2">Square Creatives:</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="bg-gray-200">
          <Image
            src={
              "https://www.augse.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchristmas.3001f650.png&w=750&q=75"
            }
            alt="Creative1"
            height="250"
            width="250"
          />
          <button
            className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
            onClick={onDelete}
          >
            <AiFillDelete />
            DELETE
          </button>
        </div>
      </div>
      <button
        className="bg-white mt-4 text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
        onClick={onUpload}
      >
        <AiOutlineUpload />
        UPLOAD
      </button>
    </div>
  );
}

export default Square;
