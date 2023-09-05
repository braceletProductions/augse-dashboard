import React from "react";
import Router from "next/router";

function OrderCard(props) {
  const showOrderDetailHandler = () => {
    Router.push({
      pathname: "/track/" + props.id,
    });
  };

  return (
    <div className="mx-auto min-h-[5rem] my-[1rem] rounded-lg flex justify-between items-center p-[1rem] bg-white">
      <div className="">
        <h1 className="text-4xl font-semibold text-blue-900 mb-2">
          {props.name}
        </h1>
        <p className="text-2xl text-blue-500">{props.email}</p>
      </div>
      <div className="flex sm:block hidden flex-col text-center">
        <h1 className="text-4xl font-semibold text-blue-900 mb-2">Payment</h1>
        <p className="text-2xl text-blue-500">
          {props.paymentMode} ({props.payment ? "Successful" : "Pending"})
        </p>
      </div>
      <button
        className="bg-blue-900 text-white rounded-lg px-4 py-2 sm:text-2xl cursor-pointer shadow-black shadow-md active:shadow-none"
        onClick={showOrderDetailHandler}
      >
        Order Detail
      </button>
    </div>
  );
}

export default OrderCard;
