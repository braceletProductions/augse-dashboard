import Sidebar from "@/components/Sidebar";
import React from "react";
import { Pie } from "react-chartjs-2";
import categoryData from "@/tempData/categoryData";

import Link from "next/link";

const Categories = () => {
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
              <div className="text-blue-400 text-xl p-6 mt-6 rounded-xl mb-6">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
