import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const User = ({ customer }) => {
  const [orderData, setOrderData] = useState([]);

  const { userId } = customer;
  console.log("hi 1 customer", customer); // This will run after the component renders

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/user/me/${userId}`
        );
        console.log(response);
        response ? setOrderData(response.data) : null;
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, [userId]); // The empty array means this effect runs only once after the initial render

  return (
    <>
      <div className="flex flex-col bg-gray-100 rounded-3xl pt-2 pb-2 mt-1 mb-1">
        <div className="flex justify-between items-center pl-5 pr-7">
          <div className="flex items-start flex-col">
            <h1 className="text-lg font-semibold text-blue-900">
              {orderData.name};
            </h1>
            <p className="text-sm  text-blue-500">{orderData.email}</p>
          </div>
          <div className="pr-7 flex flex-col mt-3 sm:flex-row sm:space-x-3">
            <Link
              href={`/product/[productId]`}
              as={`/product/${customer.productId}`}
            >
              <div className="bg-blue-900 text-white px-10 py-2 rounded-3xl">
                Product Detail
              </div>
            </Link>
            <Link href={`/track/[customerId]`} as={`/track/${customer.id}`}>
              <div className="bg-blue-900 text-white px-10 py-2 rounded-3xl cursor-pointer">
                Track
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
