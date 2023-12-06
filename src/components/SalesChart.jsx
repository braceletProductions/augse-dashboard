import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const months = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

function SalesChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [salesData, setSalesData] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 2022; year--) {
    yearOptions.push(year + " - " + (year + 1));
  }

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/sales/monthlySales/" + year,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setSalesData(res.data.monthlySales);
      } catch (error) {}
    };
    fetchSales();
  }, [year]);

  const salesChartData = {
    labels: months,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
    scales: {
      x: {
        type: "Months",
        labels: months,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Fragment>
      <div className="lg:flex gap-[4rem] px-[1.5rem] bg-white lg:w-4/5 rounded-2xl lg:h-72 mb-1 lg:mb-0">
        <form>
          <label
            htmlFor="yearSelect"
            className="block font-semibold text-gray-700 text-[1.25rem]"
          >
            Sales
          </label>
          <select
            id="yearSelect"
            name="year"
            value={year}
            onChange={handleYearChange}
            className="block w-32 mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </form>
        <Line data={salesChartData} />
      </div>
    </Fragment>
  );
}

export default SalesChart;
