import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js"; // Import Chart and CategoryScale
import MenuItems from "@/components/MenuItems";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
); // Register the CategoryScale

const categoryData = [
  { category: "Pure Silk Saree", count: 50 },
  { category: "Semi Silk Saree", count: 30 },
  { category: "Cotton Saree", count: 30 },
  { category: "Kanchivaram Saree", count: 30 },
  { category: "Bandhani Saree", count: 30 },
  { category: "Organza Saree", count: 30 },
  { category: "Printed Saree", count: 30 },
];

// Dummy sales data
const salesData = [0, 12, 10, 55, 34, 23, 67, 12, 34];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const salesChartData = {
    labels: months,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
    scales: {
      x: {
        type: "category", // Use the "category" scale for x-axis
        labels: months,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const doughnutChartData = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Add more colors if needed
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>

      <div className="flex-grow  lg:flex lg:mt-5 ">
        <Sidebar />

        <div className="flex-grow flex flex-col pl-4 pr-4  lg:w-3/4">
          <MenuItems />
          <div className="flex gap-9 flex-grow  flex-col lg:flex-row">
            <div className="bg-gray-100 lg:w-1/2 rounded-2xl lg:h-60 pt-1 pl-5 pr-5 mb-2 lg:mb-0 overflow-hidden relative">
              <h1 className="text-blue-900 text-xl mb-3 lg:mb-4">
                Total Product Count
              </h1>
              <table className="mt-1 w-full border border-collapse">
                <thead>
                  <tr className="bg-blue-800 text-gray-100 text-center">
                    <th className="font-semibold px-4 py-2">Category</th>
                    <th className="font-semibold px-4 py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item, index) => (
                    <tr key={index} className="bg-blue-200 text-center">
                      <td className="py-2 px-4 border-l-2 border-2">
                        {item.category}
                      </td>
                      <td className="py-2 px-4 border-l-2 border-2">
                        {item.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 w-1/2 rounded-2xl lg:h-60 mb-2 lg:mb-0">
              <div className="flex justify-center items-center h-full">
                <Doughnut data={doughnutChartData} />
              </div>
            </div>
          </div>
          <div className="flex flex-grow gap-2 lg:gap-9 lg:w-full lg:flex-row">
            <div className="flex bg-gray-100 w-4/5 rounded-2xl lg:h-60 mb-1 lg:mb-0">
              <h1 className="text-blue-900 text-xl  mb-10 lg:mb-4">Sales</h1>
              <Line data={salesChartData} />
            </div>

            <div className=" w-1/5  lg:h-70 mb-2 lg:mb-0">
              {/* Content for the second column */}
              <button className="bg-gray-100 rounded-2xl px-16 pt-2 pb-2 mt-5 ">
                Amount
              </button>
              <button className="bg-gray-100 rounded-2xl px-20 pt-2 pb-2 mt-5">
                GST
              </button>
              <button className="bg-gray-100 rounded-2xl px-16 pl-10 pr-10 pt-2 pb-2 mt-5">
                Total revenue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
