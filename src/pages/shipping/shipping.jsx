import React from "react";
import Link from "next/link";

import customerData from "@/tempData/customerData";
import categoryData from "@/tempData/categoryData";
import productData from "@/tempData/productData"; // Assuming you have this file

const Shipping = () => {
  return (
    <div className="flex-1">
      <div className="mt-10 mb-12 px-4">
        <h1 className="text-3xl font-bold md:text-3xl lg:text-4xl xl:text-3xl text-gray-100 pb-5">
          Shipping is Pending
        </h1>
        <div className="flex flex-col">
          {customerData.map((customer) => {
            const product = productData.find(
              (product) => product.id === customer.productId
            );

            return (
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
                    <h2 className="text-base font-semibold text-xl text-blue-900">
                      {categoryData.find(
                        (category) => category.categoryId === customer.productId
                      )?.category || "Unknown Category"}
                    </h2>
                    <h2 className="text-base font-semibold text-gray-900">
                      {product?.product || "Unknown Product"}
                    </h2>
                    <p className="text-gray-600">
                      {product?.description || "No description available"}
                    </p>
                    <Link
                      href={`/product/[productId]`}
                      as={`/product/${customer.productId}`}
                    >
                      <h3 clh3ssName="text-blue-600 ml-2">Description</h3>
                    </Link>
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
                    <button className="bg-blue-900 text-white px-10 py-2 rounded-3xl mt-3 sm:mt-0">
                      Track
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
