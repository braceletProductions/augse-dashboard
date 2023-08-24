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
      <div className="flex-grow bg-gray-100 mt-0 ml-2 rounded-2xl pr-10 pl-10 pt-10 relative">
        <div className=" text-blue-400    text-xl p-6 rounded-xl mb-6">
          <h1 className="mb-1">
            <Link href="/total/total" passHref>
              <p className="text-blue-600 hover:underline">
                <u>Total Orders</u>
              </p>
            </Link>
          </h1>
          <h1 className="mb-3 gap-x-2">
            <Link href="/cancel/cancel" passHref>
              <p className="text-blue-600 hover:underline">Canceled Orders</p>
            </Link>{" "}
            {orderData.canceled}
          </h1>
          <h1 className="mb-3 gap-x-2">
            <Link href="/return/return" passHref>
              <p className="text-blue-600 hover:underline">Return Orders</p>
            </Link>{" "}
            {orderData.returned}
          </h1>
          <h1 className="mb-3 gap-x-2">
            <Link href="/delivered/delivered" passHref>
              <p className="text-blue-600 hover:underline">Delivered Orders</p>
            </Link>{" "}
            {orderData.delivered}
          </h1>
          <h1 className="mb-3 gap-x-2">
            <Link href="/notDelivered/notdelivered" passHref>
              <p className="text-blue-600 hover:underline">
                Shipped but not delivered
              </p>
            </Link>{" "}
            {orderData.shipped}
          </h1>
          <h1 className="mb-3">
            <Link href="/shipping/shipping" passHref>
              <p className="text-blue-600 hover:underline">
                Shipping is Pending
              </p>
            </Link>{" "}
            {orderData.pending}
          </h1>
          <div className="lg:absolute top-5 right-28 p-4 rounded-xl ">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        <div className=" text-blue-400  text-center   text-xl  rounded-xl "></div>
        <div
          className="mt-6 ml-5 p-3 text-center justify-center"
          style={{ width: "80%", display: "flex", justifyContent: "center" }}
        >
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
