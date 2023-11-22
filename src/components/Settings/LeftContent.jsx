import React from "react";
import UserForm from "./CreateEmployee";
import UpdatePassword from "./UpdatePassword";

function LeftContent() {
  return (
    <div className="w-1/2 pr-2 h-[40rem] border-r-2 border-black">
      <h2 className="text-center">Manage Profile</h2>
      <UpdatePassword />
      <UserForm />
    </div>
  );
}

export default LeftContent;
