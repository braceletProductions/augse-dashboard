import React from "react";
import SalesDateRangeForm from "../SalesDateRangeForm";
import { BsCart4 } from "react-icons/bs";
import SalesChart from "../SalesChart";
import { useSelector } from "react-redux";

const Accountant = () => {
  const orders = useSelector((state) => state.orders.totalOrders) || [];

  return (
    <div className="w-full">
      <div className="bg-white w-fit flex justify-center items-center gap-2 px-4 py-2 text-xl ml-20">
        <BsCart4 /> Orders ({orders.length})
      </div>
      <div className="mx-8 flex justify-between mt-20 text-black">
        {/* <SalesChart /> */}
        <SalesDateRangeForm />
      </div>
    </div>
  );
};

export default Accountant;
