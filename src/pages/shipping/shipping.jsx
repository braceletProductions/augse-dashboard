import React from "react";
import customerData from "@/tempData/customerData";
const shipping = () => {
  return (
    <div className="flex-1">
      <div className="mt-10 mb-12 px-4">
        <h1 className="text-3xl font-bold md:text-3xl lg:text-4xl xl:text-3xl text-gray-100 pb-5">
          Shipping is Pending
        </h1>
        <div className="flex flex-col">
          {customerData.map((customer) => (
            <div
              key={customer.id}
              className="flex flex-col bg-gray-100 rounded-3xl pt-2 pb-2 mt-1 mb-1"
            >
              <div className="flex justify-between items-center pl-5 pr-7">
                <div className="flex items-start flex-col">
                  <h1 className="text-lg font-semibold text-blue-900">
                    {customer.name}
                  </h1>
                  <p className="text-sm text-gray-600 text-blue-400">
                    {customer.email}
                  </p>
                </div>
                <div className="pl-5 pr-7 py-2 flex-col">
                  <h2 className="text-base font-semibold text-gray-900">
                    Product:
                  </h2>
                </div>
                <div className="pr-7">
                  <a
                    href={`/${customer.productId}`}
                    className="bg-blue-900 text-white px-14 py-2 rounded-3xl lg:mt-0 sm:mt-3"
                  >
                    Product Detail
                  </a>
                  <button className="bg-blue-900 text-white px-14 py-2 rounded-3xl lg:mt-0 sm:mt-3">
                    Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default shipping;
