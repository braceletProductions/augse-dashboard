import React from "react";

function CardWithBackDrop(props) {
  return (
    <div className="max-w-md fixed inset-0 flex items-center justify-center lg:w-[30rem] mx-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={props.onClose}
      ></div>
      <div className="p-4 bg-white rounded-md w-full shadow-md z-10">
        {props.children}
      </div>
    </div>
  );
}

export default CardWithBackDrop;
