import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect, Fragment } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Header from "@/components/Header";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const Categories = () => {
  const router = useRouter();
  const { user } = router.query;
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

  const openCategoryPage = (name) => {
    Router.push({
      pathname: `/${user}/category/category`,
      query: { categoryName: name },
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="flex max-xl:flex-col mt-5">
        <Sidebar />
        <div className="flex flex-grow bg-gray-100 mx-2 rounded-2xl lg:px-10 lg:pt-10">
          <div className="w-full">
            <h1 className="text-4xl lg:p-10 p-5 font-semibold text-blue-800">
              Categories
            </h1>
            <div className="md:flex md:justify-between">
              <div className="lg:text-2xl text-xl md:w-1/2 min-w-[100px] max-w-[600px] min-h-[100px] max-h-[400px] overflow-auto md:mr-2 lg:px-10 px-5 lg:py-5 text-blue-900">
                {[...categoryCountsMap.keys()].map((name) => (
                  <p
                    key={name}
                    className="mb-2 cursor-pointer hover:underline"
                    onClick={() => openCategoryPage(name)}
                  >
                    {name} ({categoryCountsMap.get(name)})
                  </p>
                ))}
              </div>

              <div className="md:w-1/2 md:mr-20 md:mt-0 ml-0 text-blue-400 rounded-xl h-[22rem] p-2">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Categories;
