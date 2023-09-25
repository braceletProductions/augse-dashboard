import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import salesData from "@/tempData/salesData";
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
import Accountent from "@/components/dashboards/Accountent";

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
        type: "category", // Use the "category" scale for x-axis
        labels: months,
        grid: {
          display: false, // Remove vertical grid lines
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
        <Accountent />
      </div>
    </div>
  );
};

export default Dashboard;
