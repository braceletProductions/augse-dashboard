import React from "react";
import { AiOutlineSetting, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/ui";
import { useRouter } from "next/router";

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const val = router.query.user || user;

  return (
    <div className="  top-0 right-0 left-0 z-30 p-2">
      <header className="flex justify-end items-center">
        <div className="flex items-center space-x-4 ">
          {val === "admin" && (
            <AiOutlineSetting
              className="text-white text-xl cursor-pointer"
              onClick={() => {
                router.push("/" + val + "/settings");
              }}
            />
          )}
          <AiOutlineUser
            className="text-white text-xl cursor-pointer"
            onClick={() => {
              router.push("/" + val + "/profile");
            }}
          />
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
