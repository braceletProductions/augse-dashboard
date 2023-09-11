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
      className="mt-6 ml-5 p-3 text-center max-h-[20rem] flex flex-col justify-center items-center"
      style={{
        width: "80%",
      }}
    >
      <form className="flex gap-[2rem] justify-center" onSubmit={searchSales}>
        <input
          type="date"
          ref={startDateRef}
          min="2023-01-01"
          max={today}
          className="hover:scale-105 cursor-pointer"
        ></input>
        To
        <input
          type="date"
          ref={endDateRef}
          min="2023-01-01"
          className="hover:scale-105 cursor-pointer"
          max={today}
        ></input>
        <button
          type="submit"
          className="border-2 px-[2px] hover:scale-110 border-black"
        >
          <AiOutlineSearch />
        </button>
      </form>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export default CategoryOrderChart;
