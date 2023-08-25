import React, { useState } from "react";
import customerData from "@/tempData/customerData";
import trackOrderData from "@/tempData/trackOrder";

function OrderStatus({ status, isActive }) {
  const circleColor = isActive ? "bg-green-500" : "bg-gray-300";

  return <div className={`w-4 h-4 rounded-full ${circleColor} mx-2`} />;
}

export default function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Orders List</h2>
          <ul>
            {trackOrderData.map((order) => (
              <li
                key={order.id}
                className={`cursor-pointer ${
                  selectedOrderId === order.id ? "text-blue-500" : ""
                }`}
                onClick={() => setSelectedOrderId(order.id)}
              >
                {order.customer.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedOrderId && (
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            {trackOrderData.map((order) => {
              if (order.id === selectedOrderId) {
                return (
                  <div key={order.id}>
                    <p>
                      Customer: {order.customer.name}
                      <br />
                      Email: {order.customer.email}
                    </p>
                    <h3 className="mt-4 mb-2 text-lg font-semibold">
                      Product: {order.product.name}
                    </h3>
                    <div className="flex">
                      {order.product.tracking.map((statusInfo, index) => (
                        <div key={index} className="flex items-center">
                          <OrderStatus
                            status={statusInfo.status}
                            isActive={
                              index === order.product.tracking.length - 1
                            }
                          />
                          <p>{statusInfo.status}</p>
                          <p className="ml-2 text-gray-500">
                            ({statusInfo.date})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
