import Sidebar from "@/components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

let categoryData = [
  { categoryId: 0, category: "Pure Silk Saree", count: 0 },
  { categoryId: 1, category: "Semi Silk Saree", count: 0 },
  { categoryId: 2, category: "Cotton Saree", count: 0 },
  { categoryId: 3, category: "Kanchivaram Saree", count: 0 },
  { categoryId: 4, category: "Bandhani Saree", count: 0 },
  { categoryId: 5, category: "Organza Saree", count: 0 },
  { categoryId: 6, category: "Printed Saree", count: 0 },
];

const Categories = () => {
  const [reload, setReload] = useState(true);

  useEffect(() => {
    let res;
    const fetchProducts = async () => {
      try {
        for (let i = 0; i < categoryData.length; i++) {
          res = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_URL +
              "/products/category/" +
              categoryData[i].category
          );
          categoryData[i].count = res.data.count;
        }
        setReload((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // Extracting category names and counts from categoryData
  const categoryNames = categoryData.map((category) => category.category);
  const categoryCounts = categoryData.map((category) => category.count);

  // Data for the pie chart
  const pieChartData = {
    labels: categoryNames,
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FF7043",
          "#9575CD",
        ], // You can customize the colors here
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FF7043",
          "#9575CD",
        ],
      },
    ],
  };

  // Custom tooltip to show category names and percentages
  const tooltipCallback = (tooltipItem, data) => {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const total = dataset.data.reduce((sum, value) => sum + value, 0);
    const currentValue = dataset.data[tooltipItem.index];
    const percentage = ((currentValue / total) * 100).toFixed(2);
    const categoryName = data.labels[tooltipItem.index];

    return `${categoryName}: ${percentage}%`;
  };

  const pieChartOptions = {
    tooltips: {
      callbacks: {
        label: tooltipCallback,
      },
    },
    coutout: "50%",
    responsive: true,
  };

  return (
    <div className="flex mt-5">
      <Sidebar />
      <div className="flex flex-grow">
        <div className="w-full bg-gray-100 ml-2 rounded-2xl pr-10 pl-10 pt-10">
          <div className="flex flex-col h-full">
            <h1 className="text-blue-800 ml-10 font-bold text-3xl mb-4">
              Categories
            </h1>

            {/* Display product names and counts */}
            <div className="w-full h-full flex  p-10 mb-10">
              <div className="w-1/2 mt-4 mr-10">
                {categoryData.map((category) => (
                  <div
                    key={category.categoryId}
                    className="text-blue-500 text-xl m-5 p-1 rounded-xl"
                  >
                    <Link href={`/category/category`} passHref>
                      <p className=" hover:text-blue-800 hover:underline gap-x-7 ">
                        {category.category} <span>({category.count})</span>
                      </p>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Display the pie chart */}
              <div className="text-blue-400 text-xl rounded-xl mb-6">
                <Pie
                  className="h-[12rem]"
                  data={pieChartData}
                  options={pieChartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
