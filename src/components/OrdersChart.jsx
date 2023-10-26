import React from "react";
import Router, { useRouter } from "next/router";

function OrdersChart({ data }) {
  const router = useRouter();
  const { user } = router.query;

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
            <td className="px-4 border-l-2 border-2">{item.userId.name}</td>
            <td className="px-4 border-l-2 border-2">{item.userId.email}</td>
            <td className="px-4 border-l-2 border-2">{item._id}</td>
            <td className="px-4 border-l-2 border-2">{item._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersChart;
