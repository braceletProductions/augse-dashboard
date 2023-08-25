import React from "react";
import customerData from "@/tempData/customerData";
import categoryData from "@/tempData/categoryData";

const track = () => {
  return (
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
  );
};

export default track;
