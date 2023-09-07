import React from "react";
import currencyFormatter from "../../utils/currencyFormatter";
import BackButton from "./BackButton";

const Product = ({ product }) => {
  return (
    <div>
      <div className="mt-[2rem] ml-[4rem]">
        <BackButton />
      </div>
      <div className="flex flex-col gap-[1rem] mt-8 mx-[4rem] h-screen sm:flex-row">
        <div className="relative bg-gray-100 gap-7 w-full sm:w-1/2 rounded-l-2xl py-[2rem] px-[4rem]">
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="">
              <p className="font-semibold text-xl">{product.productName}</p>
              <p className="mt-[1rem] text-base">{product.shortDescription}</p>
            </div>
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL + product.mainImage}
              className="max-h-[12rem]"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 mt-[2rem] gap-2 text-lg">
            <h1>Category</h1>
            <p>{product.category}</p>
            <h1>Tag</h1>
            <h1 className="flex flex-col">
              {product.tags.map((tag) => (
                <span>{tag}</span>
              ))}
            </h1>
            <h1>Tax</h1>
            <h1>{product.tax}%</h1>
            <h1>Color</h1>
            <div className="">{product.color}</div>
            <h1 className="text-[green]">In Stock</h1>
            <h1>12</h1>
            <h1 className="text-[red]">Sold Out</h1>
            <h1>8</h1>
          </div>
        </div>

        <div className="bg-gray-100 rounded-e-2xl w-full sm:w-1/2 p-[2rem]">
          <div className="flex flex-col gap-2">
            {/* Content for the second div */}
            <div className="md:flex gap-10 justify-center sm:justify-start text-center sm:text-left">
              <div className="text-xl">
                <h1>Cash On Delivery</h1>
                <h1 className="text-green-400">
                  {product.isCodAllowed && "Yes"}
                </h1>
              </div>
              <div className="text-xl">
                <h1>Return Policy</h1>
                <h1 className="text-green-400">
                  {product.isReturnAble && "Yes"}
                </h1>
              </div>
              <div className="text-xl">
                <h1>Cancel Order</h1>
                <h1 className="text-green-400">
                  {product.isCancelAble && "Yes"}
                </h1>
              </div>
            </div>
            <div className="xl:flex xl:mx-0 mx-auto text-xl gap-20 mt-10">
              <div className="flex gap-10">
                <h1>MRP</h1>
                <h1>{currencyFormatter(product.mrp)}</h1>
              </div>
              <div className="flex gap-10">
                <h1>Offered Price</h1>
                <h1>{currencyFormatter(product.offeredPrice)}</h1>
              </div>
            </div>
            <div className="text-lg my-[2rem]">
              <h1>Product's other Images:</h1>
            </div>
            <div className="flex lg:flex-row flex-col gap-3">
              <img
                src={process.env.NEXT_PUBLIC_IMAGE_URL + product.otherImages[0]}
                className="gap-10 bg-gray-500 max-h-[10rem] md:max-w-[10rem] lg:max-w-none"
              />
              <img
                src={process.env.NEXT_PUBLIC_IMAGE_URL + product.otherImages[1]}
                className="gap-10 bg-gray-500 max-h-[10rem] md:max-w-[10rem] lg:max-w-none"
              />
              <img
                src={process.env.NEXT_PUBLIC_IMAGE_URL + product.otherImages[2]}
                className="gap-10 bg-gray-500 max-h-[10rem] md:max-w-[10rem] lg:max-w-none"
              />
            </div>
            <div className="mt-10 text-lg">
              <h1>Detailed Description of the product</h1>
              <p className="text-blue-600">{product.detailedDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
