import React from "react";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";

function Rect({ onDelete, onUpload, creatives1, creatives2 }) {
  return (
    <div className="flex-1 w-full">
      <div className="max-w-[30rem] mx-auto">
        <h2 className="text-white my-2">Creative 1:</h2>
        <div className="bg-gray-200">
          {creatives1.length > 0 && (
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL + creatives1[0].path}
              alt="Creative1"
              className="w-[30rem]"
            />
          )}
          <div className="flex justify-center">
            {creatives1.length > 0 && (
              <button
                className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
                onClick={() => onDelete(creatives1[0]._id)}
              >
                <AiFillDelete />
                DELETE
              </button>
            )}
            <button
              className="bg-white text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
              onClick={() => onUpload("Creative1")}
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
          {creatives2.length > 0 && (
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL + creatives2[0].path}
              alt="Creative2"
              className="w-[30rem]"
            />
          )}
          <div className="flex justify-center">
            {creatives2.length > 0 && (
              <button
                className="bg-white text-red-600 flex justify-center border-2 border-red-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-red-700"
                onClick={() => onDelete(creatives2[0]._id)}
              >
                <AiFillDelete />
                DELETE
              </button>
            )}
            <button
              className="bg-white text-green-600 flex justify-center border-2 border-green-500 items-center py-1 px-2 rounded-md mx-auto hover:text-white hover:bg-green-700"
              onClick={() => onUpload("Creative2")}
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
