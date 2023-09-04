import Sidebar from "@/components/Sidebar";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
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
import { useSelector } from "react-redux";

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
  const totalOrders = useSelector((state) => state.orders.totalOrders.length);
  const cancelledOrders = useSelector(
    (state) => state.orders.cancelledOrders.length
  );
  const returnedOrders = useSelector(
    (state) => state.orders.returnedOrders.length
  );
  const deliveredOrders = useSelector(
    (state) => state.orders.deliveredOrders.length
  );
  const pendingOrders = useSelector(
    (state) => state.orders.pendingOrders.length
  );
  const shippedOrders = useSelector(
    (state) => state.orders.shippedOrders.length
  );

  const doughnutData = {
    labels: ["Canceled", "Returned", "Delivered", "Pending", "Shipped"],
    datasets: [
      {
        data: [
          cancelledOrders,
          returnedOrders,
          deliveredOrders,
          pendingOrders,
          shippedOrders,
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
        <div className=" text-blue-400    text-xl p-6 rounded-xl mb-6 ">
          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/totalorder/totalOrder" passHref>
              <p className="text-blue-600 hover:text-blue-900 hover:underline">
                Total Orders
              </p>
            </Link>{" "}
            <span className="text-blue-600">{totalOrders}</span>
          </h1>
          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/cancel/cancel" passHref>
              <p className="text-blue-600 hover:text-blue-900">
                Cancelled Orders
              </p>
            </Link>{" "}
            <span className="text-blue-600">{cancelledOrders}</span>
          </h1>

          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/return/return" passHref>
              <p className="text-blue-600 hover:text-blue-900  ">
                Return Orders
              </p>
            </Link>{" "}
            <span className="text-blue-600">{returnedOrders}</span>
          </h1>
          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/delivered/delivered" passHref>
              <p className="text-blue-600 hover:text-blue-900  ">
                Delivered Orders
              </p>
            </Link>{" "}
            <span className="text-blue-600">{deliveredOrders}</span>
          </h1>
          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/notDelivered/notdelivered" passHref>
              <p className="text-blue-600 hover:text-blue-900  ">
                Shipped but not delivered
              </p>
            </Link>{" "}
            <span className="text-blue-600">{shippedOrders}</span>
          </h1>
          <h1 className="mb-3 gap-x-7 flex items-center">
            <Link href="/shipping/shipping" passHref>
              <p className="text-blue-600 hover:text-blue-900  ">
                Shipping is Pending
              </p>
            </Link>{" "}
            <span className="text-blue-600">{pendingOrders}</span>
          </h1>
          <div className="lg:absolute top-5 right-28 p-4 rounded-xl ">
            <Doughnut
              data={doughnutData}
              options={doughnutOptions}
              height="200px"
              width="200px"
            />
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
