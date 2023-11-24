import React, { useState } from "react";
import SpecialCouponForm from "./SpecialCouponForm";
import CouponTable from "./CouponTable";
import CreateEmployee from "./CreateEmployee";

function RightContent() {
  const [showCouponForm, setShowSpecialCouponForm] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <div className="w-1/2 pl-2 h-full">
      <h2 className="text-center">Admin Operations Hub</h2>
      <div className="my-4 bg-black overflow-scroll max-h-64 border rounded">
        <CouponTable />
      </div>
      <div className="flex gap-4">
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowSpecialCouponForm(true)}
        >
          Add Special Coupon
        </button>
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowAddEmployee(true)}
        >
          Add New Employee
        </button>
      </div>
      {showCouponForm ? (
        <SpecialCouponForm onClose={() => setShowSpecialCouponForm(false)} />
      ) : showAddEmployee ? (
        <CreateEmployee onClose={() => setShowAddEmployee(false)} />
      ) : null}
    </div>
  );
}

export default RightContent;
