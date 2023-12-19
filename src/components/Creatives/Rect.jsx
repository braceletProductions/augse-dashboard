import React from "react";
import Image from "next/image";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";

function Rect({ onDelete, onUpload }) {
  return (
    <div className="flex-1 w-full">
      <div className="max-w-[30rem] mx-auto">
        <h2 className="text-white my-2">Creative 1:</h2>
        <div className="bg-gray-200">
          <Image
            src={
              "https://www.augse.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage13.9ce4e47a.png&w=1920&q=75"
            }
            alt="Creative1"
            height="150"
            width="300"
            className="w-[30rem]"
          />
          <div className="flex justify-center">
            <button
              className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
              onClick={onDelete}
            >
              <AiFillDelete />
              DELETE
            </button>
            <button
              className="bg-white text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
              onClick={onUpload}
            >
              <AiOutlineUpload />
              UPLOAD
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[30rem] mx-auto">
        <h2 className="text-white my-2">Creative 2:</h2>
        <div className="bg-gray-200">
          <Image
            src={
              "https://www.augse.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage13.9ce4e47a.png&w=1920&q=75"
            }
            alt="Creative1"
            height="150"
            width="300"
            className="w-[30rem]"
          />
          <div className="flex justify-center">
            <button
              className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
              onClick={onDelete}
            >
              <AiFillDelete />
              DELETE
            </button>
            <button
              className="bg-white text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
              onClick={onUpload}
            >
              <AiOutlineUpload />
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rect;
