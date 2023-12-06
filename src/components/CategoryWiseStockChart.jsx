import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  BarElement
);

function CategoryWiseStockChart() {
  const [categoryCountsMap, setCategoryCountsMap] = useState(new Map());
  const products = useSelector((state) => state.products.totalProducts);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const countsMap = new Map();
        products.forEach((product) => {
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
  }, [products]);

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
    <div className="flex-[1] my-[2rem] mx-auto">
      <div className="text-[white] flex justify-center rounded-xl h-[22rem] p-2">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
      <div className="text-white text-3xl text-center">
        Category wise stock details
      </div>
    </div>
  );
}

export default CategoryWiseStockChart;
