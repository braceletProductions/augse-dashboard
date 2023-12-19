import React, { useState } from "react";
import SpecialCouponForm from "./SpecialCouponForm";
import CouponTable from "./CouponTable";
import CreateEmployee from "./CreateEmployee";
import PickupRequestForm from "../ShipmentForm/PickupRequest";
import CreateWarehouse from "../ShipmentForm/CreateWarehouse";
import UpdateWarehouse from "../ShipmentForm/UpdateWarehouse";
import NDRForm from "../ShipmentForm/NDRForm";
import NDRStatus from "../ShipmentForm/NDRStatus";
import Link from "next/link";

function RightContent() {
  const [showCouponForm, setShowSpecialCouponForm] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddWarehouse, setShowAddWarehouse] = useState(false);
  const [showUpdateWarehouse, setShowUpdateWarehouse] = useState(false);
  const [showCreatePickup, setShowCreatePickup] = useState(false);
  const [showNDRAction, setShowNDRAction] = useState(false);
  const [showNDRStatus, setShowNDRStatus] = useState(false);

  return (
    <div className="w-1/2 pl-2 h-full">
      <h2 className="text-center">Admin Operations Hub</h2>
      <div className="my-4 bg-black overflow-scroll max-h-64 border rounded">
        <CouponTable />
      </div>
      <div className="grid grid-cols-2 gap-2">
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
        {/* <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowAddWarehouse(true)}
        >
          Create Warehouse
        </button>
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowUpdateWarehouse(true)}
        >
          Update Warehouse
        </button> */}
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowCreatePickup(true)}
        >
          Create Pickup Request
        </button>
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowNDRAction(true)}
        >
          Take NDR Action
        </button>
        <button
          className="text-white mx-auto w-60 px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
          onClick={() => setShowNDRStatus(true)}
        >
          NDR Status
        </button>
        <Link
          href={"/admin/settings/creatives"}
          className="text-white mx-auto w-60 text-center px-4 py-2 bg-[#40a0d3] rounded hover:bg-[#041E3E]"
        >
          Manage Creatives
        </Link>
      </div>
      {showCouponForm ? (
        <SpecialCouponForm onClose={() => setShowSpecialCouponForm(false)} />
      ) : showAddEmployee ? (
        <CreateEmployee onClose={() => setShowAddEmployee(false)} />
      ) : showAddWarehouse ? (
        <CreateWarehouse onClose={() => setShowAddWarehouse(false)} />
      ) : showUpdateWarehouse ? (
        <UpdateWarehouse onClose={() => setShowUpdateWarehouse(false)} />
      ) : showCreatePickup ? (
        <PickupRequestForm onClose={() => setShowCreatePickup(false)} />
      ) : showNDRAction ? (
        <NDRForm onClose={() => setShowNDRAction(false)} />
      ) : showNDRStatus ? (
        <NDRStatus onClose={() => setShowNDRStatus(false)} />
      ) : null}
    </div>
  );
}

export default RightContent;
