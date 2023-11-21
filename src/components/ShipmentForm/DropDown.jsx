import React from "react";

function Dropdown({ id, label, options, selectedOption, onSelect }) {
  return (
    <div className="mb-2 w-full">
      <label
        className="block text-gray-700 ml-1 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          id={label}
          value={selectedOption}
          onChange={(e) => onSelect(e.target.value, id)}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((data) => (
            <option key={data.label} value={data.value}>
              {data.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.582l-6.293-6.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 1 0-1.414-1.414L10 12.582z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
