import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function CategoryWiseProduct({ user }) {
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/category/category",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCategoryData(res.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    let res = [];
    const fetchProducts = async () => {
      try {
        for (let i = 0; i < categoryData.length; i++) {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_URL +
              "/products/category/" +
              categoryData[i],
            {
              params: {
                timestamp: currentTimestamp,
              },
            }
          );
          res[i] = response.data.count;
        }
        setCategory(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [categoryData]);

  return (
    <div
      className={`bg-gray-100 lg:w-1/2 min-h-[18rem] rounded-2xl ${
        user !== "procurement" &&
        "overflow-y-scroll lg:h-[18rem] overflow-hidden"
      } pt-1 pl-5 pr-5 mb-2 lg:mb-0 relative`}
    >
      <div className="flex justify-between items-center mb-3 lg:mb-4">
        <h2 className="font-semibold text-gray-700 text-[1.25rem]">
          Total Product Count
        </h2>
        <Link href={`/${user}/category/table`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/151/151926.png"
            className="h-[2rem] hover:bg-slate-300 p-1 hover:scale-110 transition-colors cursor-pointer"
          />
        </Link>
      </div>
      <table className="my-4 w-full border border-collapse">
        <thead>
          <tr className="bg-blue-800 text-gray-100 text-center">
            <th className="font-semibold px-4 py-1">Category</th>
            <th className="font-semibold px-4 py-1">Count</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr key={index} className="bg-blue-200 text-center">
              <td className="px-4 border-l-2 border-2">
                {categoryData[index]}
              </td>
              <td className="px-4 border-l-2 border-2">{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryWiseProduct;
