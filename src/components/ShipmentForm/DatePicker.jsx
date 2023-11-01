import React from "react";

function DatePicker({ label, selectedDate, onDateChange }) {
  const handleDateChange = (e) => {
    onDateChange(e.target.value);
  };

  const formattedDate = selectedDate ? selectedDate.split("T")[0] : "";

  return (
    <div className="mb-2 w-full">
      <label
        className="block text-gray-700 text-sm ml-1 font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          id={label}
          value={formattedDate}
          onChange={handleDateChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
}

export default DatePicker;
