import React from "react";
import Router, { useRouter } from "next/router";

function OrdersChart({
  length,
  newOrders,
  readyToDispatch,
  dispatched,
  delivered,
}) {
  const router = useRouter();
  const { user } = router.query;

  const data = [];
  for (let i = 0; i < length; i++) {
    let arr = [];
    if (newOrders[i]) {
      arr.push(newOrders[i]);
    } else {
      arr.push({});
    }
    if (readyToDispatch[i]) {
      arr.push(readyToDispatch[i]);
    } else {
      arr.push({});
    }
    if (dispatched[i]) {
      arr.push(dispatched[i]);
    } else {
      arr.push({});
    }
    if (delivered[i]) {
      arr.push(delivered[i]);
    } else {
      arr.push({});
    }
    console.log(arr);
    data.push(arr);
  }

  const showOrderDetailHandler = (id) => {
    Router.push({
      pathname: "/" + user + "/track/" + id,
    });
  };

  return (
    <table className="my-4 w-full border border-collapse">
      <thead>
        <tr className="bg-blue-800 text-gray-100 text-center">
          <th className="font-semibold px-4 py-1">S.No.</th>
          <th className="font-semibold px-4 py-1">New Order</th>
          <th className="font-semibold px-4 py-1">Ready to Dispatch</th>
          <th className="font-semibold px-4 py-1">Dispatched</th>
          <th className="font-semibold px-4 py-1">Delivered</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="bg-blue-200 text-center">
            <td className="px-4 border-l-2 border-2">{index + 1}</td>
            <td className="px-4 border-l-2 border-2 hover:underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
              {item[0] ? item[0]._id : ""}
            </td>
            <td className="px-4 border-l-2 border-2 hover:underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
              {item[1] ? item[1]._id : ""}
            </td>
            <td className="px-4 border-l-2 border-2 hover:underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
              {item[2] ? item[2]._id : ""}
            </td>
            <td className="px-4 border-l-2 border-2 hover:underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
              {item[3] ? item[3]._id : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersChart;
