import React from "react";

function NoOrder() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-gray-100 rounded-lg shadow-md">
        <p className="text-3xl font-semibold mb-4">No orders found</p>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    </div>
  );
}

export default NoOrder;
