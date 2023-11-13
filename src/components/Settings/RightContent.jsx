import React from "react";
import SpecialCouponForm from "./SpecialCouponForm";
import CouponTable from "./CouponTable";
import CreateEmployee from "./CreateEmployee";

function RightContent() {
  return (
    <div className="w-1/2 pl-2 h-full">
      <h2 className="text-center">Admin Operations Hub</h2>
      <div className="my-4 bg-black overflow-scroll max-h-40 border rounded">
        <CouponTable />
      </div>
      <SpecialCouponForm />
      <CreateEmployee />
    </div>
  );
}

export default RightContent;
