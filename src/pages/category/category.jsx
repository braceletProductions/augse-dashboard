import React from "react";
import varietyData from "@/tempData/varietyData";
import Link from "next/link";

const Category = () => {
  return (
    <div className="flex flex-wrap gap-6 mt-10  p-4 justify-center items-center text-gray-100">
      {varietyData.map((category) => (
        <div
          key={category.id}
          className="bg-gray-100  flex flex-col justify-between  max-w-2xl min-w- full h-60" // Set width and height to create a square card
        >
          <Link href={`/category/${category.id}`} passHref>
            <p className="flex flex-col h-full">
              <div className="h-1/2">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-1/2 text-center ">
                <h3
                  className="text-lg font-semibold mx-4"
                  style={{ color: "rgb(27, 72, 121)" }}
                >
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 ">{category.description}</p>
              </div>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
