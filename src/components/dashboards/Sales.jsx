import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import CategoryWiseProduct from "../CategoryWiseProduct";
import SalesChart from "../SalesChart";
import CategoryWiseSaleChart from "../CategoryWiseSaleChart";

function Sales() {
  const orders = useSelector((state) => state.orders.totalOrders) || [];

  return (
    <div className="w-full p-4">
      <div className="bg-white w-fit flex justify-center items-center gap-2 px-4 py-2 text-xl ml-20">
        <BsCart4 /> Orders ({orders.length})
      </div>
      <div className="flex justify-between gap-4 my-5">
        <CategoryWiseSaleChart />
        <CategoryWiseProduct />
      </div>
      <SalesChart />
    </div>
  );
}

export default Sales;
