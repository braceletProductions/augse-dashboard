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

  return (
    <div className="flex mt-5">
      <Sidebar />
      <div className=" flex  bg-gray-100 mt-0 ml-2 rounded-2xl pr-10 pl-10 pt-3">
        <div>
          <h1>
            <u>Total Orders</u>
          </h1>
          <h1>Canceled Orders: {orderData.canceled}</h1>
          <h1>Returned Orders: {orderData.returned}</h1>
          <h1>Delivered Orders: {orderData.delivered}</h1>
          <h1>Shipped Orders: {orderData.shipped}</h1>
          <h1>Pending Orders: {orderData.pending}</h1>
        </div>

        <div className="chart-container">
          <Doughnut data={doughnutData} />
        </div>
        <h1 className="justify-center text-center">
          Orders segregated on the bases of category
        </h1>
        <h1 className="justify-center text-center">
          Orders segregated on the bases of category
        </h1>
        <h1 className="justify-center text-center">
          Orders segregated on the bases of category
        </h1>
      </div>
    </div>
  );
};

export default Orders;
