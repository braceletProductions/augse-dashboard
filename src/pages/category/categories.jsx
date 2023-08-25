import Sidebar from "@/components/Sidebar";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import categoryData from "@/tempData/categoryData";
import orderData from "@/tempData/orderData";
import doughnutData from "@/tempData/dougnutData";
import barData from "@/tempData/barData";
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

const calculatePercentage = (value, total) =>
  ((value / total) * 100).toFixed(2);

const Orders = () => {
  const totalOrders =
    orderData.canceled +
    orderData.returned +
    orderData.delivered +
    orderData.shipped +
    orderData.pending;

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = calculatePercentage(value, totalOrders);
            const label = context.label || "";
            return `${label}: ${value} (${percentage}%)`;
          },
          title: () => null, // Remove the default title (category label)
        },
      },
    },
    cutout: "55%",
    responsive: true,
  };

  const barOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 25,
        tricks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="flex mt-5">
      <Sidebar />

      <div className="flex-grow bg-gray-100  ml-2 rounded-2xl pr-10 pl-10 pt-10 relative">
        <h1 className="text-blue-800 font-bold  text-2xl">Categories</h1>
        {/* Display product names and counts */}
        <div className="text-blue-400 text-xl p-6 rounded-xl mb-6">
          <ul>
            {categoryData.map((category) => (
              <li key={category.categoryId} className="mb-2">
                <Link
                  href={`/product/${category.categoryId}`} // Adjust the link based on your route
                  passHref
                >
                  <p className="text-blue-600 hover:text-blue-900 underline">
                    {category.category} ({category.count})
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
