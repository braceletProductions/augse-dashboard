import React, { useState } from "react";
import formatToINR from "../../utils/currencyFormatter";

const SalesDateRangeForm = () => {
  const [selectedRange, setSelectedRange] = useState("last1year");
  const [sales, setSales] = useState(0);

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const handleSearch = () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="flex w-[20rem] lg:w-[30rem] flex-col items-center gap-4">
      <div className="flex items-center">
        <label className="text-sm font-semibold mr-2 text-white">
          Date Range:
        </label>
        <select
          value={selectedRange}
          onChange={handleRangeChange}
          className="border p-1 rounded"
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last14days">Last 14 Days</option>
          <option value="last1month">Last 1 Month</option>
          <option value="last4months">Last 4 Months</option>
          <option value="last1year">Last 1 Year</option>
        </select>
      </div>
      <button
        className="bg-green-500 text-white w-full lg:w-[15rem] rounded-full text-center py-2 hover:bg-green-600"
        onClick={handleSearch}
      >
        Search
      </button>
      <button className="bg-gray-100 w-full lg:w-[15rem] rounded-full py-2 mt-3">
        Amount: {formatToINR(sales)}
      </button>
      <button className="bg-gray-100 w-full lg:w-[15rem] rounded-full py-2">
        GST: {formatToINR(sales)}
      </button>
      <button className="bg-gray-100 w-full lg:w-[15rem] rounded-full py-2">
        Total Revenue: {formatToINR(sales)}
      </button>
    </div>
  );
};

export default SalesDateRangeForm;
