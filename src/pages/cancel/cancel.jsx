import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import User from "@/components/User/User";

const Cancel = () => {
  const router = useState();
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios(
          `http://localhost:4001/api/v1/orders/orders`
        );
        console.log(response);
        response ? setCustomerData(response.data) : null;
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerData();
  }, []);

  return (
    <div className="flex-1">
      <div className="mt-10 mb-12 px-4">
        <h1 className="text-3xl font-bold md:text-3xl lg:text-4xl xl:text-3xl text-gray-100 pb-5">
          Cancel Orders
        </h1>
        <div className="flex flex-col">
          {customerData.map((customer, index) => (
            <User customer={customer} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cancel;
