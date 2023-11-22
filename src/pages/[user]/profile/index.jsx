import Sidebar from "@/components/Sidebar";
import Profile from "@/components/profile/Profile";
import React from "react";

function index() {
  return (
    <div className="w-full">
      <div className="max-w-screen mx-auto bg-blue-400">
        <div className="w-full flex">
          <Sidebar />
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default index;
