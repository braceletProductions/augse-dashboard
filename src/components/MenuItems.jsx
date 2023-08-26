import React from "react";
import { FaShoppingCart, FaUser, FaBox, FaClipboardList } from "react-icons/fa";

const menuItems = [
  {
    label: "Orders",
    icon: <FaShoppingCart className="text-2xl " />,
  },
  { label: "Users", icon: <FaUser className="text-2xl  " /> },
  { label: "Products", icon: <FaBox className="text-2xl  " /> },
  { label: "Track Orders", icon: <FaClipboardList className="text-2xl  " /> },
];

const MenuItems = (props) => {
  return (
    <div className="flex-grow flex flex-col pl-4 pr-4 lg:w-full">
      <div className="flex flex-col justify-center text-center bg-gray-100 rounded-3xl   pt-1 pb-1 mt-1 mb-1 lg:flex-row lg:justify-center lg:flex-wrap font-bold">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex  gap-1  bg-blue-500 text-white pr-1 pl-2 mr-28 pt-2 pb-2 ml-4 text-xl mb-1 lg:mb-0 lg:mr-10 lg:ml-1 lg:w-42 lg:pl-8 lg:pr-8"
          >
            {item.icon} <span className="hidden lg:inline"> </span>
            {item.label} {item.label != "Track Orders" && <span>(</span>}
            {item.label == "Orders" && props.orders}
            {item.label == "Users" && props.users}
            {item.label == "Products" && props.products}
            {item.label != "Track Orders" && <span>)</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
