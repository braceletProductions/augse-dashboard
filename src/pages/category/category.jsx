import React from "react";
import varietyData from "@/tempData/varietyData";
import Link from "next/link";

const Category = () => {
  return (
    <div className="flex flex-wrap  gap-6 p-4 justify-center text-gray-100">
      {varietyData.map((category) => (
        <div
          key={category.id}
          className="w-30  h-21 p-4  bg-gray-100  flex flex-col justify-between"
        >
          <p>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="max-w-full h-auto "
            />
            <Link href={`/category/${category.id}`} passHref>
              <h3
                className="text-lg font-semibold my-2 text-center "
                style={{ color: "rgb(27, 72, 121)" }}
              >
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {category.description}
              </p>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
