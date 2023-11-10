import React from "react";
import {
  AiOutlineEye,
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/ui";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = router.query;

  return (
    <div className="  top-0 right-0 left-0 z-30 p-2">
      <header className="flex justify-end items-center">
        <div className="flex items-center space-x-4 ">
          <AiOutlineEye className="text-white text-xl cursor-pointer" />
          <AiOutlineBell className="text-white text-xl cursor-pointer" />
          <AiOutlineSetting
            className="text-white text-xl cursor-pointer"
            onClick={() => {
              router.push("/" + user + "/settings");
            }}
          />
          <AiOutlineUser className="text-white text-xl cursor-pointer" />
          <AiOutlineMenu
            className="text-white text-2xl cursor-pointer block lg:hidden"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
