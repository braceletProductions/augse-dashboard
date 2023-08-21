// components/Sidebar.jsx
import React from "react";

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
    <div className="h-screen w-1/4 lg:w-4/5 bg-white flex flex-col">
      <div
        className="w-48 h-32 p-4  flex items-center justify-center"
        style={{
          backgroundImage: "url('/logo.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "auto",
        }}
      ></div>
      <div className="flex-grow w-36 pl-7 ">
        <ul className="py-4">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-8 ">
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
