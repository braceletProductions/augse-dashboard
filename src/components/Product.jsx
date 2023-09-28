import React, { useState } from "react";
import currencyFormatter from "../../utils/currencyFormatter";
import BackButton from "./BackButton";
import { useRouter } from "next/router";
import axios from "axios";

const Product = ({ product }) => {
  const [visibility, setVisiblity] = useState(product.visibility);
  const [disability, setDisability] = useState(false);
  const router = useRouter();
  const { user, productId } = router.query;

  const updateProduct = () => {
    router.push({
      pathname: `/${user}/products/update/${productId}`,
    });
  };

  const hideproduct = async () => {
    setDisability(true);
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL +
          `/products/hide_product/${productId}`
      );
      setVisiblity(false);
    } catch (error) {}
    setDisability(false);
  };

  const showproduct = async () => {
    setDisability(true);
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL +
          `/products/show_product/${productId}`
      );
      setVisiblity(true);
    } catch (error) {}
    setDisability(false);
  };

  return (
    <div>
      <div className="mt-[2rem] ml-[4rem]">
        <BackButton />
      </div>
      <div className="flex flex-col gap-[1rem] mt-8 mx-[4rem] min-h-screen sm:flex-row">
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
              {product.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </h1>
            <h1>Tax</h1>
            <h1>{product.tax}%</h1>
            <h1>Color</h1>
            <div
              className={`w-[1.5rem] h-[1.5rem] rounded-full`}
              style={{ backgroundColor: product.color }}
            ></div>
            <h1 className="text-[green]">In Stock</h1>
            <h1>{product.quantity}</h1>
            <h1 className="text-[red]">Sold Out</h1>
            <h1>{product.sold}</h1>
          </div>
          <div className="flex gap-[2rem] mt-[2rem]">
            {visibility ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded float-right disabled:cursor-not-allowed"
                onClick={hideproduct}
                disabled={disability}
              >
                Hide
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded float-right disabled:cursor-not-allowed"
                onClick={showproduct}
                disabled={disability}
              >
                Show
              </button>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded float-right disabled:cursor-not-allowed"
              onClick={updateProduct}
              disabled={disability}
            >
              Update
            </button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-e-2xl w-full sm:w-1/2 p-[2rem]">
          <div className="flex flex-col gap-2">
            {/* Content for the second div */}
            <div className="md:flex gap-10 justify-center sm:justify-start text-center sm:text-left">
              <div className="text-xl">
                <h1 className="text-xl font-semibold">Cash On Delivery</h1>
                <h1 className="text-green-400">
                  {product.isCodAllowed && "Yes"}
                </h1>
              </div>
              <div className="text-xl">
                <h1 className="text-xl font-semibold">Return Policy</h1>
                <h1 className="text-green-400">
                  {product.isReturnAble && "Yes"}
                </h1>
              </div>
              <div className="text-xl">
                <h1 className="text-xl font-semibold">Cancel Order</h1>
                <h1 className="text-green-400">
                  {product.isCancelAble && "Yes"}
                </h1>
              </div>
            </div>
            <div className="xl:flex xl:mx-0 mx-auto text-xl gap-20 mt-10">
              <div className="flex gap-10">
                <h1 className="text-xl font-semibold">MRP:</h1>
                <h1>{currencyFormatter(product.mrp)}</h1>
              </div>
              <div className="flex gap-10">
                <h1 className="text-xl font-semibold">Offered Price:</h1>
                <h1>{currencyFormatter(product.offeredPrice)}</h1>
              </div>
            </div>
            <div className="text-lg my-[2rem]">
              <h1 className="text-xl font-semibold">Product's other Images:</h1>
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
              <h1 className="text-xl font-semibold mb-4">
                Detailed Description of the product
              </h1>
              <ul className="text-blue-600 list-disc ml-[1.5rem]">
                {product.detailedDescription.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
