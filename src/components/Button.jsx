import React from "react";

function Button({ text, onClick }) {
  return (
    <div
      className="px-[1rem] py-[0.4rem] bg-blue-500 cursor-pointer shadow-black shadow-sm active:shadow-none"
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
