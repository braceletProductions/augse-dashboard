import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import CategoryWiseProduct from "../CategoryWiseProduct";
import CategoryWiseStockChart from "../CategoryWiseStockChart";

function Procurement() {
  const orders = useSelector((state) => state.orders.totalOrders) || [];

  return (
    <div className="w-full p-4">
      <div className="bg-white w-fit flex justify-center items-center gap-2 px-4 py-2 text-xl ml-20">
        <BsCart4 /> Orders ({orders.length})
      </div>
      <div className="flex gap-4 flex-grow flex-col lg:flex-row mt-20">
        <CategoryWiseProduct user="procurement" />
        <CategoryWiseStockChart />
      </div>
    </div>
  );
}

export default Procurement;
