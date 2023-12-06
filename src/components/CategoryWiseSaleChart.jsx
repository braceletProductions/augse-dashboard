import axios from "axios";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Legend, Tooltip, Title } from "chart.js/auto";
import LoadingSpinner from "./LoadingSpnner";

function CategoryWiseSaleChart() {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const minDateDefault = firstDayOfMonth.toISOString().split("T")[0];
  const maxDateDefault = lastDayOfMonth.toISOString().split("T")[0];

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/sales/" +
            minDateDefault +
            "/" +
            maxDateDefault +
            "/category",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCategoryCounts(res.data.sales);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);

  const doughnutData = {
    labels: categoryCounts.map((arr) => arr[0]),
    datasets: [
      {
        data: categoryCounts.map((arr) => arr[1]),
        backgroundColor: [
          "#153e64",
          "#2862af",
          "#3e88ea",
          "#66a3ff",
          "#99c2ff",
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
            const percentage = (
              (value / categoryCounts.reduce((acc, cur) => acc + cur[1], 0)) *
              100
            ).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 p-1 lg:w-1/2 h-[20rem] rounded-2xl">
      <h2 className="text-center font-semibold text-gray-700 text-[1.25rem]">
        Category Wise Monthly Sale
      </h2>
      {categoryCounts.length > 0 ? (
        <div className="h-[17.8rem] flex justify-center items-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default CategoryWiseSaleChart;
