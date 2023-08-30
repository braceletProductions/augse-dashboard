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
  const [reload, setReload] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryNamesFromApi, setCategoryNamesFromApi] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/products/get_all_Products`
        );
        setCategoryData(response.data);

        const namesFromApi = response.data.map((category) => category.category);
        setCategoryNamesFromApi(namesFromApi);
        console.log("namesFromApi", namesFromApi[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);
  const filterCategories = (selectedCategories) => {
    const filteredData = categoryData.filter((category) =>
      selectedCategories.includes(category.category)
    );
    setCategoryData(filteredData);
  };

  // Extracting category names and counts from categoryData
  const categoryNames = categoryData.map((category) => category.category);
  const categoryCounts = categoryData.map((category) => category.viewount);

  // Calculate the category counts
  const categoryCountsMap = categoryNamesFromApi.reduce((countMap, name) => {
    countMap[name] = (countMap[name] || 0) + 1;
    return countMap;
  }, {});
  // Data for the pie chart
  const pieChartData = {
    labels: categoryNames,
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FF7043",
          "#9575CD",
        ], // You can customize the colors here
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

  // Custom tooltip to show category names and percentages
  const tooltipCallback = (tooltipItem, data) => {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const total = dataset.data.reduce((sum, value) => sum + value, 0);
    const currentValue = dataset.data[tooltipItem.index];
    const percentage = ((currentValue / total) * 100).toFixed(2);
    const categoryName = data.labels[tooltipItem.index];

    return `${categoryName}: ${percentage}%`;
  };

  const pieChartOptions = {
    tooltips: {
      callbacks: {
        label: tooltipCallback,
      },
    },
    coutout: "50%",
    responsive: true,
  };

  return (
    <div className="flex mt-5">
      <Sidebar />
      <div className="flex flex-grow h-screen">
        <div className="w-full bg-gray-100 ml-2 rounded-2xl pr-10 pl-10 pt-10">
          <div className="flex flex-col h-full">
            <h1 className="text-blue-800 ml-10 font-bold text-3xl mb-4">
              Categories
            </h1>

            {/* Filtering dropdown */}
            <div className="w-1/2 mt-4 mr-10 bg-gray-100">
              <select
                multiple
                onChange={(e) => filterCategories(e.target.value)}
              >
                {categoryNamesFromApi.map((name) => (
                  <option key={name} value={name}>
                    {name}({categoryCountsMap[name]})
                  </option>
                ))}
              </select>
            </div>

            {/* Display the pie chart */}
            <div className="text-blue-400 text-xl rounded-xl mb-6">
              <Pie
                className="h-[12rem]"
                data={pieChartData}
                options={pieChartOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
