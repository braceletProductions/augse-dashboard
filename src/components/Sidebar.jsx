import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const optionsProducts = [
  { label: "Add Product", link: "/products/addproduct" },
  { label: "All Products", link: "/products/allproducts" },
  { label: "Out of Stock", link: "/products/status/outofstock" },
  { label: "Less in Stock", link: "/products/status/lessinstock" },
];

const Sidebar = () => {
  const [productOptions, setProductsOptions] = useState(false);
  const router = useRouter();
  const { user } = router.query;
  const showSidebar = useSelector((state) => state.ui.sidebar);

  const showProductsOptions = () => {
    setProductsOptions((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen sm:w-1/5 w-[10rem] lg:w-2/12 bg-gray-100 flex flex-col lg:flex-col text-center ${
        showSidebar ? "" : "max-lg:hidden"
      }`}
    >
      <div>
        <div className=" lg:p-1 w-full  h-28  flex justify-center align-items  items-center">
          <a href={`/${user}/dashboard/dashboard`}>
            <Image src={logo} width={150} height={40} alt="Logo" />
          </a>
        </div>
      </div>
      <div className="flex-grow sm:w-full overflow-x-auto overflow-y-auto">
        <ul className="lg:w-full">
          <li className="mb-6 lg:mb-5">
            <a
              href={`/${user}/dashboard/dashboard`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Dashboard
            </a>
          </li>
          <li className="mb-6 lg:mb-5">
            <a
              href={`/${user}/category/categories`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Category
            </a>
          </li>
          <li className="mb-6 lg:mb-5">
            <a
              href={`/${user}/orders/orders`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Orders
            </a>
          </li>
          <li className="lg:mb-5">
            <div
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link relative p-3 hover:rounded-xl justify-center align-items  items-center "
              onClick={showProductsOptions}
            >
              Products
            </div>
            <div
              className={`transition-all ${
                productOptions ? "translate-x-0" : "-translate-x-[20rem]"
              }`}
            >
              {productOptions &&
                optionsProducts.map((option, index) => (
                  <div className="m-1" key={index}>
                    <a
                      href={"/" + user + option.link}
                      className="text-black font-medium hover:text-gray-100 p-1 px-2 link hover:rounded-xl justify-center"
                    >
                      {option.label}
                    </a>
                  </div>
                ))}
            </div>
          </li>
          <li className="my-6 lg:mb-5">
            <a
              href={`/${user}/customers/customer`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Customers
            </a>
          </li>
          <li className="mb-6 lg:mb-5">
            <a
              href={`/${user}/payment`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Payment
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
