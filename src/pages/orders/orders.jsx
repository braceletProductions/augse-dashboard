import Sidebar from "@/components/Sidebar";
import React from "react";

const orders = () => {
  return (
    <div className="flex mt-5">
      {/* Sidebar */}

      <Sidebar />

      <div>
        <div className="bg-gray-100 m-10 ">
          <h1>hi order</h1>
        </div>
      </div>
    </div>
  );
};

export default orders;
