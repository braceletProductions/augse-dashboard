import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Tooltip,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js"; // Import Chart and CategoryScale
import MenuItems from "@/components/MenuItems";
import Link from "next/link";
import { useRouter } from "next/router";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
  ArcElement
); // Register the CategoryScale

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const router = useRouter();
  const { user } = router.query;
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    yearOptions.push(year);
  }

  //Counting users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/user/counts"
        );
        setUsers(res.data.numbers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/count"
        );
        setOrders(res.data.numbers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/count"
        );
        setProducts(res.data.numbers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/category/category"
        );
        setCategoryData(res.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    let res = [];
    const fetchProducts = async () => {
      try {
        for (let i = 0; i < categoryData.length; i++) {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_URL +
              "/products/category/" +
              categoryData[i]
          );
          res[i] = response.data.count;
        }
        setCategory(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [categoryData]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/sales/monthlySales/" + year
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

  const doughnutChartData = {
    labels: categoryData,
    datasets: [
      {
        data: category,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Add more colors if needed
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const doughnutChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;

            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <div className="flex-grow  lg:flex lg:mt-5 ">
        <Sidebar />
        <div className="flex-grow flex flex-col pl-4 pr-4  lg:w-3/4">
          <MenuItems orders={orders} users={users} products={products} />
          <div className="flex gap-9 flex-grow  flex-col lg:flex-row">
            <div className="bg-gray-100 lg:w-1/2 overflow-y-scroll rounded-2xl lg:h-[18rem] pt-1 pl-5 pr-5 mb-2 lg:mb-0 overflow-hidden relative">
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h1 className="text-blue-900 text-xl">Total Product Count</h1>
                <Link href={`/${user}/category/table`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/151/151926.png"
                    className="h-[2rem] hover:bg-slate-300 p-1 hover:scale-110 transition-colors cursor-pointer"
                  />
                </Link>
              </div>
              <table className="my-4 w-full border border-collapse">
                <thead>
                  <tr className="bg-blue-800 text-gray-100 text-center">
                    <th className="font-semibold px-4 py-1">Category</th>
                    <th className="font-semibold px-4 py-1">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item, index) => (
                    <tr key={index} className="bg-blue-200 text-center">
                      <td className="px-4 border-l-2 border-2">
                        {categoryData[index]}
                      </td>
                      <td className="px-4 border-l-2 border-2">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 w-1/2 lg:h-[18rem] rounded-2xl mb-2 lg:mb-0">
              <div className="flex justify-center items-center h-full">
                <Doughnut
                  data={doughnutChartData}
                  options={doughnutChartOptions}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex flex-grow gap-2 lg:gap-9 lg:w-full lg:flex-row">
            <div className="flex gap-[4rem] px-[1.5rem] bg-white w-4/5 rounded-2xl lg:h-72 mb-1 lg:mb-0">
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
                  className="block w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  defaultValue={2023}
                >
                  <option value="">-- Select Year --</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </form>
              <Line data={salesChartData} />
            </div>

            <div className="w-1/5 mb-2 lg:mb-0">
              <button className="bg-gray-100 w-[10rem] lg:mb-[1rem] rounded-2xl text-center lg:py-3 py-1 mt-5 ">
                Amount
              </button>
              <button className="bg-gray-100 w-[10rem] lg:mb-[1rem]  rounded-2xl text-center lg:py-3 py-1 mt-5">
                GST
              </button>
              <button className="bg-gray-100 w-[10rem] rounded-2xl text-center lg:py-3 py-1 mt-5">
                Total revenue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
