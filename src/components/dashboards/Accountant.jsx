import React from "react";
import Orders from "./orders/Orders";
import formatToINR from "../../../utils/currencyFormatter";

const Accountant = () => {
  const OrdersNumber = 120;
  const amount = 1000000;
  const gst = 180000;
  return (
    <div className="w-full">
      <Orders OrdersNumber={OrdersNumber} />
      <div className="mt-4 flex justify-around items-center">
        <div className="bg-white rounded-full gap-2 p-2 w-fit flex justify-around items-center">
          <span className="text-black text-xl">Amount</span>
          <span className="text-gray-700">{formatToINR(amount)}</span>
        </div>
        <div className="bg-white rounded-full gap-2 p-2 w-fit flex justify-around items-center">
          <span className="text-black text-xl">Amount</span>
          <span className="text-gray-700">{formatToINR(gst)}</span>
        </div>
        <div className="bg-white rounded-full gap-2 p-2 w-fit flex justify-around items-center">
          <span className="text-black text-xl">Amount</span>
          <span className="text-gray-700">{formatToINR(amount - gst)}</span>
        </div>
      </div>
    </div>
  );
};

export default Accountant;
