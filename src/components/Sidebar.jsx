import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard" },
    { label: "Category" },
    { label: "Orders" },
    { label: "Products" },
    { label: "Customers" },
    { label: "Payment" },
  ];

  return (
    <div className="h-screen w-1/4 lg:w-4/5 bg-white flex flex-col mb-10 justify-center text-center items-center">
      <div className="mb-2 p-0 bg-gray-600 ">
        <div className="bg-gray-200">
          <a href="/dashboard/dashboard">
            <Image src={logo} width={400} alt="Logo" />
          </a>
        </div>
      </div>

      <div className="flex-grow w-38 pl-7">
        <ul className="py-1">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-5">
              <a
                href="#"
                className="flex items-center text-gray-900 font-medium hover:text-blue-400 p-3"
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
