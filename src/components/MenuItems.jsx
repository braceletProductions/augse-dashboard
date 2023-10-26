import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaShoppingCart, FaUser, FaBox, FaClipboardList } from "react-icons/fa";

const menuItems = [
  {
    label: "Orders",
    icon: <FaShoppingCart className="text-2xl" />,
    href: "/totalorder/totalOrder",
  },
  {
    label: "Users",
    icon: <FaUser className="text-2xl" />,
    href: "/customers/customer",
  },
  {
    label: "Products",
    icon: <FaBox className="text-2xl" />,
    href: "/products/allproducts",
  },
  {
    label: "Orders Chart",
    icon: <FaClipboardList className="text-2xl" />,
    href: "/orders/chart",
  },
];

const MenuItems = (props) => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <div className="flex-grow flex flex-col pl-4 pr-4 mb-[1rem] lg:w-full">
      <div className="bg-gray-100 rounded-3xl py-[0.5rem] px-[2rem] xl:flex xl:flex-row sm:grid xl:justify-between gap-[1rem] sm:grid-cols-2 flex flex-col justify-center items-center">
        {menuItems.map((item, index) => (
          <Link
            href={"/" + user + item.href}
            key={index}
            className="bg-blue-500 text-lg text-white flex justify-center gap-1 w-[12rem] py-2 px-4 font-semibold"
          >
            {item.icon} <span className="hidden lg:inline"> </span>
            {item.label} {item.label != "Orders Chart" && <span>(</span>}
            {item.label == "Orders" && props.orders}
            {item.label == "Users" && props.users}
            {item.label == "Products" && props.products}
            {item.label != "Orders Chart" && <span>)</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
