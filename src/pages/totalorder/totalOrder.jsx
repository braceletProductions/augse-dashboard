import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "@/components/OrderCard";
import BackButton from "@/components/BackButton";

const totalOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders"
        );
        setOrders(response.data);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 flex-wrap">
      <div className="mx-[1.5rem] mt-[1.3rem]">
        <BackButton />
      </div>
      <div className="mt-8 mb-12 px-4">
        <h1 className="font-bold  text-gray-100 pb-5 text-5xl">
          Total Orders
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

export default totalOrder;
