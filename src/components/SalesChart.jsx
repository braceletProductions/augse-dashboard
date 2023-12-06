import React, { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30;
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
    options: {
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "Sales",
        data: salesData,
      },
    ],
  };

  return (
      <div className="lg:flex justify-between gap-4 px-4 bg-white lg:w-4/5 rounded-2xl lg:h-80 mb-1 lg:mb-0">
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
        {typeof window !== "undefined" && (
          <div className="w-full">
            <ApexChart
              options={salesChartData.options}
              series={salesChartData.series}
              type="line"
              height={300}
            />
          </div>
        )}
      </div>
  );
}

export default SalesChart;
