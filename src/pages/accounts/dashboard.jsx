import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Accountant from "@/components/dashboards/Accountant";
import React from "react";

function dashboard() {
  const user = "accounts";
  
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto">
        <Header user={user} />
        <div className="w-full flex text-blue-400">
          <Sidebar user={user} />
          <Accountant />
        </div>
      </div>
    </div>
  );
}

export default dashboard;
