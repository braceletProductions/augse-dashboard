import React from "react";
import OrderCard from "@/components/OrderCard";
import BackButton from "@/components/BackButton";
import { useSelector } from "react-redux";
import SortableTable from "@/components/SortableTable";

const Shipping = () => {
  const orders = useSelector((state) => state.orders.deliveredOrders);

  return (
    <div className="flex-1 flex-wrap">
      <div className="mx-[1.5rem] mt-[1.3rem]">
        <BackButton />
      </div>
      <div className="mt-8 mb-12 px-4">
        <h1 className="font-bold  text-gray-100 pb-5 text-5xl">
          Delivered Orders
        </h1>
        <SortableTable data={orders} />
      </div>
    </div>
  );
};

export default Shipping;
