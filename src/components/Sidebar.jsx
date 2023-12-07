import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const optionsProducts = [
  { label: "Add Product", link: "/products/addproduct" },
  { label: "All Products", link: "/products/allproducts" },
  { label: "Out of Stock", link: "/products/status/outofstock" },
  { label: "Less in Stock", link: "/products/status/lessinstock" },
];

const Sidebar = ({ user }) => {
  const [productOptions, setProductsOptions] = useState(false);
  const router = useRouter();
  const showSidebar = useSelector((state) => state.ui.sidebar);

  if (user === undefined) {
    user = router.query.user;
  }

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
          <Link href={`/${user}/dashboard`}>
            <Image src={logo} width={150} height={40} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="flex-grow sm:w-full overflow-x-auto overflow-y-auto">
        <ul className="lg:w-full">
          <li className="mb-6 lg:mb-5">
            <Link
              href={`/${user}/dashboard`}
              className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
            >
              Dashboard
            </Link>
          </li>
          {(user === "admin" || user === "procurement") && (
            <li className="mb-6 lg:mb-5">
              <Link
                href={`/${user}/category`}
                className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
              >
                Category
              </Link>
            </li>
          )}
          {(user === "admin" || user === "procurement" || user == "sales") && (
            <li className="mb-6 lg:mb-5">
              <Link
                href={`/${user}/orders`}
                className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
              >
                Orders
              </Link>
            </li>
          )}
          {(user === "admin" || user === "procurement" || user == "sales") && (
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
                      <Link
                        href={"/" + user + option.link}
                        className="text-black font-medium hover:text-gray-100 p-1 px-2 link hover:rounded-xl justify-center"
                      >
                        {option.label}
                      </Link>
                    </div>
                  ))}
              </div>
            </li>
          )}
          {user === "admin" && (
            <li className="my-6 lg:mb-5">
              <Link
                href={`/${user}/customers`}
                className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
              >
                Customers
              </Link>
            </li>
          )}
          {(user === "admin" || user === "accounts") && (
            <li className="mb-6 lg:mb-5">
              <Link
                href={`/${user}/payment`}
                className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
              >
                Payment
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
