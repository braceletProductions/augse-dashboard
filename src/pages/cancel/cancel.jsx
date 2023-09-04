import React, { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import BackButton from "@/components/BackButton";
import { useSelector } from "react-redux";

const Cancel = () => {
  const orders = useSelector((state) => state.orders.cancelledOrders);

  return (
    <div className="flex-1 flex-wrap">
      <div className="mx-[1.5rem] mt-[1.3rem]">
        <BackButton />
      </div>
      <div className="mt-8 mb-12 px-4">
        <h1 className="font-bold  text-gray-100 pb-5 text-5xl">
          Cancelled Orders
        </h1>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            id={order._id}
            name={order.userId.name}
            email={order.userId.email}
            payment={order.payment_successful}
            paymentMode={order.paymentMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Cancel;
