import React from "react";
import SalesDateRangeForm from "../SalesDateRangeForm";
import { BsCart4 } from "react-icons/bs";

const Accountant = () => {
  const OrdersNumber = 120;

  return (
    <div className="w-full">
      <div className="bg-white w-fit flex justify-center items-center gap-2 px-4 py-2 text-xl ml-20">
        <BsCart4 /> Orders ({OrdersNumber})
      </div>
      <div className="w-full flex justify-between mt-20">
        <SalesDateRangeForm />
      </div>
    </div>
  );
};

export default Accountant;
