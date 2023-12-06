import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
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
import SalesDateRangeForm from "@/components/SalesDateRangeForm";
import SalesChart from "@/components/SalesChart";
import CategoryWiseProduct from "@/components/CategoryWiseProduct";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  PointElement,
  ArcElement
); // Register the CategoryScale

const Dashboard = () => {
  const user = "admin";
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/user/counts",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
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
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/count",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
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
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/count",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
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
          process.env.NEXT_PUBLIC_SERVER_URL + "/category/category",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
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
              categoryData[i],
            {
              params: {
                timestamp: currentTimestamp,
              },
            }
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
    <div className="flex flex-col max-w-screen-2xl mx-auto min-h-screen">
      <Header user={user} />
      <div className="flex-grow lg:flex lg:mt-5">
        <Sidebar user={user} />
        <div className="flex-grow flex flex-col px-4 lg:w-3/4">
          <MenuItems
            orders={orders}
            users={users}
            products={products}
            user={user}
          />
          <div className="flex gap-4 flex-grow flex-col lg:flex-row">
            <CategoryWiseProduct user="admin" />
            <div className="bg-gray-100 w-1/2 lg:h-[20rem] rounded-2xl mb-2 lg:mb-0">
              <div className="flex justify-center items-center h-full bg-white min-w-[22rem] rounded-lg">
                <Doughnut
                  data={doughnutChartData}
                  options={doughnutChartOptions}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex flex-grow gap-2 lg:gap-9 my-2 lg:w-full lg:flex-row">
            <SalesChart />
            <SalesDateRangeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
