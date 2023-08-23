import Sidebar from "@/components/Sidebar";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";

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
  const orderData = {
    canceled: 20,
    returned: 10,
    delivered: 50,
    shipped: 15,
    pending: 5,
  };
  const categoryData = [
    { category: "Pure Silk Saree", count: 21 },
    { category: "Semi Silk Saree", count: 16 },
    { category: "Cotton Saree", count: 7 },
    { category: "Kanchivaram Saree", count: 8 },
    { category: "Bandhani Saree", count: 17 },
    { category: "Organza Saree", count: 5 },
    { category: "Printed Saree", count: 23 },
  ];
  const totalOrders =
    orderData.canceled +
    orderData.returned +
    orderData.delivered +
    orderData.shipped +
    orderData.pending;

  const doughnutData = {
    labels: ["Canceled", "Returned", "Delivered", "Shipped", "Pending"],
    datasets: [
      {
        data: [
          orderData.canceled,
          orderData.returned,
          orderData.delivered,
          orderData.shipped,
          orderData.pending,
        ],
        backgroundColor: [
          "#153e64",
          "#03284a",
          "#33f9f9",
          "#08b7c2",
          "#177cac",
        ],
      },
    ],
  };

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
  const barData = {
    labels: categoryData.map((item) => item.category), // Extract category names as labels
    datasets: [
      {
        label: "Order segregated based on category",
        data: categoryData.map((item) => item.count), // Extract count values as data
        backgroundColor: ["#153e64"], // Add more colors if needed
      },
    ],
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
            <u>Total Orders</u>
          </h1>
          <h1 className="mb-3 gap-x-2">Canceled Orders {orderData.canceled}</h1>
          <h1 className="mb-3 gap-x-2">Return Orders {orderData.returned}</h1>
          <h1 className="mb-3 gap-x-2">
            Delivered Orders {orderData.delivered}
          </h1>
          <h1 className="mb-3 gap-x-2">
            Shipped but not delivered {orderData.shipped}
          </h1>
          <h1 className="mb-3">Shipping is Pending {orderData.pending}</h1>
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
