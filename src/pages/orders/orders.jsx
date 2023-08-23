import Sidebar from "@/components/Sidebar";
import React, { useRef, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  BarController,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  BarController
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

  const categoryData = {
    cat1: 1,
    cat2: 2,
    cat3: 3,
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
    cutout: "55%",
    responsive: true,
  };

  const barData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Orders by Category",
        data: Object.values(categoryData),
        backgroundColor: ["red", "orange", "green", "blue"], // Add more colors if needed
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }
  }, []);

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
            <Doughnut
              ref={doughnutChartRef}
              data={doughnutData}
              options={doughnutOptions}
            />
          </div>
        </div>

        <div className=" text-blue-400  text-center   text-xl p-6 rounded-xl ">
          <h1 className="mb-1">Order segregated based on category</h1>
        </div>

        <div className="mt-6 p-4">
          <Bar ref={barChartRef} data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
