import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import OrdersChart from "@/components/OrdersChart";
import axios from "axios";

function chart() {
  const [orders, setOrders] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/pending/orders",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex-1 flex-wrap">
          <div className="mx-[1.5rem] mt-[1.3rem]">
            <BackButton />
          </div>
          <div className="mt-8 mb-12 px-4">
            <h1 className="font-bold  text-gray-100 pb-5 text-5xl">
              Orders Chart
            </h1>
            <OrdersChart data={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default chart;
