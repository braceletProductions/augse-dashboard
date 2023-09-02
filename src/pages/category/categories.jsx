import Sidebar from "@/components/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryCountsMap, setCategoryCountsMap] = useState(new Map());

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/get_all_Products"
        );
        setCategoryData(response.data);

        const countsMap = new Map();
        response.data.forEach((product) => {
          if (countsMap.has(product.category)) {
            countsMap.set(
              product.category,
              countsMap.get(product.category) + 1
            );
          } else {
            countsMap.set(product.category, 1);
          }
        });
        setCategoryCountsMap(countsMap);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);

  const pieChartData = {
    labels: [...categoryCountsMap.keys()],
    datasets: [
      {
        data: [...categoryCountsMap.values()],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FF7043",
          "#9575CD",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FF7043",
          "#9575CD",
        ],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const value = dataset.data[context.dataIndex];
            const total = dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
    responsive: true,
  };

  return (
    <div className="flex mt-5">
      <Sidebar />

      <div className="flex flex-grow bg-gray-100 ml-2 rounded-2xl pr-10 pl-10 pt-10">
        <div className="w-full p-10">
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(27,21,121)" }}
          >
            Category
          </h1>

          <div className="md:flex md:justify-between mt-10 ">
            <div
              className="text-2xl md:w-1/2 min-w-[100px] max-w-[600px] min-h-[100px] max-h-[400px] overflow-auto md:mr-2 p-10"
              style={{ color: "rgb(27,21,172)" }}
            >
              {[...categoryCountsMap.keys()].map((name) => (
                <p key={name} className="mb-2 cursor-pointer">
                  {name} ({categoryCountsMap.get(name)})
                </p>
              ))}
            </div>

            <div className="md:w-1/2 md:mr-20  md:mt-0 ml-0  text-blue-400  rounded-xl h-[22rem] p-2">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
