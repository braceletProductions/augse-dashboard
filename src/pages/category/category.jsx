import React from "react";
import varietyData from "@/tempData/varietyData";
import Link from "next/link";

const Category = () => {
  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center items-center text-gray-100">
      {varietyData.map((category) => (
        <div
          key={category.id}
          className="bg-gray-100 flex flex-col justify-between"
        >
          <p>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-1/2 object-cover"
            />
            <Link href={`/category/${category.id}`} passHref>
              <div className="h-1/2 text-center">
                <h3
                  className="text-lg font-semibold my-2"
                  style={{ color: "rgb(27, 72, 121)" }}
                >
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
