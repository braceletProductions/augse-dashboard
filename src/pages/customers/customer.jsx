import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

const Customer = () => {
  const router = useRouter();
  // const customerData = [
  //   { id: 1, name: "Liza D'Souza", email: "awserdky.nhtrsdf@gmail.com" },
  //   { id: 2, name: "Sakshi Sinha", email: "awserdky.nhtrsdf@gmail.com" },
  //   // Add more customer data entries here
  // ];

  const handleProfileClick = (customerId) => {
    router.push(`/customers/${customerId}`); // Navigate to customer detail page
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-5 lg:mt-5">
      {/* Sidebar */}

      <Sidebar />

      {/* Customers Content */}
      <div className="flex-1">
        <div className="mt-10 mb-12 px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-gray-100 pb-5">
            Customers
          </h1>
          <div className="flex flex-col">
            {customerData.map((customer) => (
              <div
                key={customer.id}
                className="flex justify-between items-center bg-gray-100 rounded-3xl pt-2 pb-2 mt-1 mb-1"
              >
                <div className="flex items-start flex-col pl-5">
                  <h1 className="text-lg font-semibold text-blue-900">
                    {customer.name}
                  </h1>
                  <p className="text-sm text-gray-600 text-blue-400">
                    {customer.email}
                  </p>
                </div>
                <div className="pr-7">
                  <button
                    className="bg-blue-900 text-white px-14 py-2 rounded-3xl lg:mt-0 sm:mt-3"
                    onClick={() => handleProfileClick(customer.id)}
                  >
                    Profile
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
