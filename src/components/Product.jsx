// import BackButton from "@/components/BackButton";
// import Product from "@/components/Product";
import React from "react";

const Product = ({ product }) => {
  console.log("Product :  ", product);
  return (
    <div>
      <div className="flex flex-col mt-14 ml-3 mr-3 h-screen sm:flex-row">
        {/* <BackButton /> */}
        <div className="relative bg-gray-100 gap-7 w-full sm:w-1/2 p-5">
          <div className="flex flex-col sm:flex-row">
            <div className="">
              <p className="font-bold">{product.productName}</p>
              <p className="text-sm">{product.description}</p>
            </div>
            <div className="relative mt-4 border-8 sm:ml-20">
              {product.mainImage}
            </div>
          </div>
          <div className="flex flex-col mt-4 gap-2 sm:flex-row sm:gap-28">
            <h1>Category</h1>
            <p>{product.category}</p>
          </div>
          <div className=" flex mt-4 gap-40 ">
            <h1>Tag</h1>
            <h1>Tax</h1>
          </div>
          <div className=" flex mt-4 gap-28 ">
            <h1>Indicator</h1>
            <div className="flex  ">
              <h1>colour</h1>{" "}
              <div className="rounded-xl w-4 h-3 bg-gray-500 ml-10 mt-2"></div>
            </div>
          </div>
          <div className=" flex mt-4 gap-40 ">
            <h1>In Stock</h1>
            <h1>12</h1>
          </div>
          <div className=" flex mt-4 gap-40 ">
            <h1>Sold Out</h1>
            <h1>8</h1>
          </div>
        </div>

        <div className="bg-gray-100 w-full sm:w-1/2 p-5">
          <div className="flex flex-col gap-2">
            {/* Content for the second div */}
            <div className="flex gap-10 justify-center sm:justify-start text-center sm:text-left">
              <div className="">
                <h1>Cash On Delivery</h1>
                <h1 className="text-green-400">Yes</h1>
              </div>
              <div className="">
                <h1>Return Policy</h1>
                <h1 className="text-green-400">Yes</h1>
              </div>
              <div className="">
                <h1>Cancel Order</h1>
                <h1 className="text-green-400">{product.isCancelAble}</h1>
              </div>
            </div>
            <div className="flex  gap-20 mt-20 ">
              <div className="flex gap-10">
                <h1>MRP</h1>
                <h1>{product.mrp}</h1>
              </div>
              <div className="flex gap-10">
                <h1>Offered Price</h1>
                <h1>{product.offeredPrice}</h1>
              </div>
            </div>
            <div className="flex  gap-3 mt-16 ">
              <div>
                <h1>Product's other Images</h1>
              </div>
              <div className="flex gap-10 bg-gray-500 h-20 w-20">
                {product.otherImages}
              </div>
              <div className="flex gap-10 bg-gray-500 h-20 w-20">
                {product.otherImages}
              </div>
              <div className="flex gap-10 bg-gray-500 h-20 w-20">
                {product.otherImages}
              </div>
              <div className="flex gap-10 bg-gray-500 h-20 w-20">
                {product.otherImages}
              </div>
            </div>
            <div className="mt-10 ">
              <h1>Detailed Description of the product</h1>
              <p className="text-blue-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
