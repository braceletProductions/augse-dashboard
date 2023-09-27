import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

const Customer = () => {
  const router = useRouter();
  const { user } = router.query;
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/user/getusers/customer"
        );
        setCustomers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleProfileClick = (customerId) => {
    router.push(`/${user}/customers/${customerId}`); // Navigate to customer detail page
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen mt-5 lg:mt-5">
      <Sidebar />
      <div className="flex-1">
        <div className="mt-10 mb-12 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-gray-100 pb-5">
            Customers
          </h1>
          <div className="flex flex-col">
            {customers.map((customer) => (
              <div
                key={customer._id}
                className="flex justify-between items-center bg-gray-100 rounded-3xl pt-2 pb-2 mt-1 mb-1"
              >
                <div className="flex items-start flex-col pl-5">
                  <h1 className="text-lg font-semibold text-blue-900">
                    {customer.name}
                  </h1>
                  <p className="text-sm text-blue-400">{customer.email}</p>
                </div>
                <div className="pr-7">
                  <button
                    className="bg-blue-900 font-semibold text-white sm:px-6 px-4 py-2 rounded-3xl lg:mt-0 sm:mt-3 cursor-pointer shadow-black shadow-md active:shadow-none"
                    onClick={() => handleProfileClick(customer._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
