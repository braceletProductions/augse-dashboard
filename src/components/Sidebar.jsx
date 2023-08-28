import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", link: "/dashboard/dashboard" },
    { label: "Category", link: "/category/categories" },
    { label: "Orders", link: "/orders/orders" },
    { label: "Products", link: "/product/[productId]" },
    { label: "Customers", link: "/customers/customer" },

    { label: "Payment" },
  ];

  return (
    <div className="h-full sm:w-1/5 w-1/5  lg:w-2/12 bg-gray-100 flex flex-col lg:flex-row lg:flex-col  text-center">
      <div>
        <div className=" lg:p-1 w-full  h-28  flex justify-center align-items  items-center">
          <a href="/dashboard/dashboard">
            <Image src={logo} width={150} height={40} alt="Logo" />
          </a>
        </div>
      </div>
      <div className="flex-grow sm:w-full overflow-x-auto overflow-y-auto">
        <ul className="lg:w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-6 lg:mb-5">
              <a
                href={item.link}
                className="block lg:inline-block text-gray-900 font-bold hover:text-gray-100 link p-3 hover:rounded-xl justify-center align-items  items-center "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
