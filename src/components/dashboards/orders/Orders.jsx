import React from "react";
import { BsCart4 } from "react-icons/bs";

const Orders = ({OrdersNumber}) => {
  return (
    <div className="bg-white w-fit flex gap-1 p-2 ml-5">
      <BsCart4 className="mt-1" /> Orders ({OrdersNumber})
    </div>
  );
};

export default Orders;
