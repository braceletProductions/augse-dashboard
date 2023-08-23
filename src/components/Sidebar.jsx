import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", link: "/dashboard/dashboard" },
    { label: "Category" },
    { label: "Orders", link: "/orders/orders" },
    { label: "Products" },
    { label: "Customers", link: "/customers/customer" },
    { label: "Payment" },
  ];

  return (
    <div className="h-full sm:w-1/5 w-1/5  lg:w-2/12 bg-gray-100 flex flex-col lg:flex-row lg:flex-col  text-center">
      <div>
        <div>
          <a href="/dashboard/dashboard">
            <Image src={logo} width={300} alt="Logo" />
          </a>
        </div>
      </div>
      <div>
        <ul className="lg:w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-6 lg:mb-5">
              <a
                href={item.link}
                className="block lg:inline-block text-gray-900 font-medium hover:text-blue-400 pb-6 text-center "
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
