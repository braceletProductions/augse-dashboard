import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
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

function status() {
  const [categoryCountsMap, setCategoryCountsMap] = useState(new Map());
  const [outofstock, setoutofstock] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const status = router.query.status;
  const products = useSelector((state) => state.products.totalProducts);

  if (!products) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (status == "outofstock") {
      const filter = products.filter((data) => data.quantity === 0);
      setoutofstock(true);
      setFilteredProducts(filter);
    } else {
      const filter = products.filter(
        (data) => data.quantity <= 5 && data.quantity !== 0
      );
      setFilteredProducts(filter);
    }
  }, [status, products]);

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
    <div className="w-full">
      <div className="ml-[2rem] mt-[2rem]">
        <BackButton />
      </div>
      <div className="max-w-screen-2xl mx-auto p-[2rem]">
        <div className="text-5xl text-white font-semibold">
          Products {outofstock ? "Out of" : "Less in"} Stock
        </div>
        <div className="flex lg:flex-row flex-col my-[2rem]">
          <div className="flex-[2] p-[1rem]">
            <div className="sm:grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex flex-col justify-center items-center gap-[2rem]">
              {filteredProducts.map((data) => (
                <ProductCard
                  key={data._id}
                  id={data._id}
                  image={data.mainImage}
                  name={data.productName}
                  status={outofstock}
                />
              ))}
            </div>
          </div>
          <div className="flex-[1] my-[2rem] mx-auto">
            <div className="text-[white] flex justify-center rounded-xl h-[22rem] p-2">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="text-white text-3xl text-center">
              Category wise stock details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default status;
