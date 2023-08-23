import Sidebar from "@/components/Sidebar";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js"; // Import Chart and CategoryScale

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
);

const calculatePercentage = (value, total) =>
  ((value / total) * 100).toFixed(2);

const Orders = () => {
  // Dummy data for demonstration
  const orderData = {
    canceled: 20,
    returned: 10,
    delivered: 50,
    shipped: 15,
    pending: 5,
  };

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
        backgroundColor: ["red", "orange", "green", "blue", "gray"],
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
        },
      },
    },
  };

  return (
    <div className="flex mt-5">
      <Sidebar />
      <div className="flex-grow bg-gray-100 mt-0 ml-2 rounded-2xl pr-10 pl-10 pt-10 relative">
        <div className=" text-blue-400   text-xl p-4 rounded-xl mb-4">
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
        </div>
        <div className="lg:absolute top-5 right-28 p-4 rounded-xl ">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div className=" mt-6 lg:mt-20 p-4  text-blue-400 rounded-xl text-center">
          <h1>Orders segregated on the bases of category</h1>
        </div>
      </div>
    </div>
  );
};

export default Orders;
