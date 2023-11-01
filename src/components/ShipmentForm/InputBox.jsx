import React from "react";

function InputBox({ id, label, type, value, onChange }) {
  return (
    <div className="mb-2 w-full">
      <label
        className="block text-gray-700 text-sm ml-1 font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        defaultValue={value}
        type={type === "number" ? type : "text"}
        placeholder={label}
        onChange={(e) => {
          onChange(e.target.value, id);
        }}
      />
    </div>
  );
}

export default InputBox;
