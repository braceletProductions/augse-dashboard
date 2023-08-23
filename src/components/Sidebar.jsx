import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", link: "/dashboard/dashboard" },
    { label: "Category" },
    { label: "Orders" },
    { label: "Products" },
    { label: "Customers", link: "/customers/customer" },
    { label: "Payment" },
  ];

  return (
    <div className="h-full w-1/4 lg:w-3/5 bg-white flex flex-col lg:flex-row lg:flex-col justify-between lg:mb-5 lg:sticky lg:top-0 text-center">
      <div className="bg-gray-200">
        <a href="/dashboard/dashboard">
          <Image src={logo} width={400} alt="Logo" />
        </a>
      </div>

      <ul className="lg:flex-grow lg:w-full lg:pl-7">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-3 lg:mb-5">
            <a
              href={item.link}
              className="block lg:inline-block text-gray-900 font-medium hover:text-blue-400 p-3 lg:p-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
