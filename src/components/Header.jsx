import React from "react";
import {
  AiOutlineEye,
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";

const Header = () => {
  return (
    <div className="  top-0 right-0 left-0 z-30 p-2">
      <header className="flex justify-end items-center">
        <div className="flex items-center space-x-4 ">
          {/* Icons */}
          <AiOutlineEye className="text-white text-xl" />
          <AiOutlineBell className="text-white text-xl" />
          <AiOutlineSetting className="text-white text-xl" />
          <AiOutlineUser className="text-white text-xl" />
        </div>
        <div>
          {/* Hamburger Menu */}
          <AiOutlineMenu className="text-white text-2xl" />
        </div>
      </header>
    </div>
  );
};

export default Header;
