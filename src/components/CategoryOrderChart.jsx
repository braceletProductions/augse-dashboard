import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { AiOutlineSearch } from "react-icons/ai";

function CategoryOrderChart() {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const startDateRef = useRef();
  const endDateRef = useRef();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/sales/daily/category"
        );
        if (response.data.sales) setCategoryCounts(response.data.sales);
      } catch (error) {}
    };
    startDateRef.current.value = today;
    endDateRef.current.value = today;
    fetchCategoryData();
  }, []);

  const barData = {
    labels: categoryCounts.map((arr) => arr[0]),
    datasets: [
      {
        label: "Order segregated based on category",
        data: categoryCounts.map((arr) => arr[1]),
        backgroundColor: ["#153e64"],
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
        suggestedMax: 10,
        tricks: {
          stepSize: 5,
        },
      },
    },
  };

  const searchSales = async (event) => {
    event.preventDefault();

    const minDate = startDateRef.current.value;
    const maxDate = endDateRef.current.value;
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/sales/" +
          minDate +
          "/" +
          maxDate +
          "/category"
      );
      setCategoryCounts(res.data.sales);
    } catch (error) {}
  };

  return (
    <div
      className="mx-auto my-8 rounded-md mt-6 ml-5 p-5 text-center max-h-[20rem] flex gap-[5rem] items-center"
      style={{
        width: "80%",
      }}
    >
      <form
        className="min-w-[10rem] flex flex-col gap-[1rem]"
        onSubmit={searchSales}
      >
        <h2 className="text-xl font-bold">Date Range</h2>
        <div className="text-left">
          <label
            htmlFor="startDate"
            className="block text-sm font-semibold text-gray-600 mb-2"
          >
            From:
          </label>
          <input
            id="startDate"
            type="date"
            ref={startDateRef}
            min="2023-01-01"
            max={today}
            className="w-full p-2 border-2 border-blue-800 rounded cursor-pointer"
          ></input>
        </div>
        <div className="text-left">
          <label htmlFor="endDate" className="text-black">
            To:
          </label>
          <input
            id="endDate"
            type="date"
            ref={endDateRef}
            min="2023-01-01"
            max={today}
            className="w-full p-2 border-2 border-blue-800 rounded cursor-pointer"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded shadow-sm shadow-black active:shadow-none hover:bg-blue-900"
        >
          Search
        </button>
      </form>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export default CategoryOrderChart;
