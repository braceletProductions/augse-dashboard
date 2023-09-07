import Sidebar from "@/components/Sidebar";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
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
        <div className="xl:flex justify-between">
          <div className=" text-blue-400 text-xl p-6 rounded-xl mb-6 ">
            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/totalorder/totalOrder" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Total Orders ({totalOrders})
                </p>
              </Link>
            </h1>
            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/cancel/cancel" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Cancelled Orders ({cancelledOrders})
                </p>
              </Link>
            </h1>

            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/return/return" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Returned Orders ({returnedOrders})
                </p>
              </Link>
            </h1>
            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/delivered/delivered" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Delivered Orders ({deliveredOrders})
                </p>
              </Link>
            </h1>
            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/notDelivered/notdelivered" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Shipped but not delivered ({shippedOrders})
                </p>
              </Link>
            </h1>
            <h1 className="mb-3 gap-x-7 flex items-center">
              <Link href="/shipping/shipping" passHref>
                <p className="text-blue-600 hover:text-blue-900 hover:underline">
                  Shipping is Pending ({pendingOrders})
                </p>
              </Link>
            </h1>
          </div>
          <div className="w-[40rem] max-h-[20rem] rounded-xl flex justify-center">
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
