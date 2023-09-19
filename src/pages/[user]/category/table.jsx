import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";

function table() {
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/category/category"
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
              categoryData[i]
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
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-[2rem] py-[1.5rem]">
        <BackButton />
        <div className="bg-white my-[1rem] rounded-3xl lg:px-[5rem] sm:px-[2rem] px-[1rem] py-[1rem]">
          <div className="text-[2rem] font-medium">
            Categorywise Products Count
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
      </div>
    </div>
  );
}

export default table;
