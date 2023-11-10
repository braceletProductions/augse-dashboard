import Sidebar from "@/components/Sidebar";
import React, { Fragment } from "react";
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";
import CategoryOrderChart from "@/components/CategoryOrderChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header from "@/components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const calculatePercentage = (value, total) =>
  ((value / total) * 100).toFixed(2);

const Orders = () => {
  const router = useRouter();
  const { user } = router.query;
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

  return (
    <Fragment>
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <div className="flex-grow bg-white mt-0 ml-2 rounded-2xl px-10 py-10 relative">
          <div className="xl:flex justify-between">
            <div className=" text-blue-400 text-xl p-6 rounded-xl mb-6 ">
              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/totalorder/totalOrder`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Total Orders ({totalOrders})
                  </p>
                </Link>
              </h1>
              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/shipping/shipping`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Pending Orders ({pendingOrders})
                  </p>
                </Link>
              </h1>
              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/notDelivered/notdelivered`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Shipped but not delivered ({shippedOrders})
                  </p>
                </Link>
              </h1>
              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/delivered/delivered`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Delivered Orders ({deliveredOrders})
                  </p>
                </Link>
              </h1>
              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/cancel/cancel`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Cancelled Orders ({cancelledOrders})
                  </p>
                </Link>
              </h1>

              <h1 className="mb-3 gap-x-7 flex items-center">
                <Link href={`/${user}/return/return`} passHref>
                  <p className="text-blue-600 hover:text-blue-900 hover:underline">
                    Returned Orders ({returnedOrders})
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
          <CategoryOrderChart />
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
