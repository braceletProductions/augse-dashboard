import React from "react";
import formatToINR from "../../../utils/currencyFormatter";

function PaymentTable({ orders, showPaymentDetailHandler }) {
  return (
    <table className="my-4 w-full border border-collapse">
      <thead>
        <tr className="bg-blue-800 text-gray-100 text-center">
          <th className="font-semibold px-4 py-1">S.No.</th>
          <th className="font-semibold px-4 py-1">Email</th>
          <th className="font-semibold px-4 py-1">Order Id</th>
          <th className="font-semibold px-4 py-1">Order Date</th>
          <th className="font-semibold px-4 py-1">Payment</th>
          <th className="font-semibold px-4 py-1">GST</th>
          <th className="font-semibold px-4 py-1">Payment Mode</th>
          <th className="font-semibold px-4 py-1">Payment Status</th>
          <th className="font-semibold px-4 py-1">Payment Detail</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, index) => (
          <tr key={index} className="bg-blue-200 text-center">
            <td className="px-4 border-l-2 border-2">{index + 1}</td>
            <td className="px-4 border-l-2 border-2">{item.userId.email}</td>
            <td className="px-4 border-l-2 border-2">{item._id}</td>
            <td className="px-4 border-l-2 border-2">
              {item.createdAt.substring(0, 10)}
            </td>
            <td className="px-4 border-l-2 border-2">
              {formatToINR(item.price)}
            </td>
            <td className="px-4 border-l-2 border-2">
              {formatToINR(item.gst)}
            </td>
            <td className="px-4 border-l-2 border-2">{item.paymentMode}</td>
            <td className="px-4 border-l-2 border-2">
              {item.payment_successful
                ? "Successful"
                : `${
                    item.paymentMode == "Cash On Delivery"
                      ? "Pending"
                      : "Failed"
                  }`}
            </td>
            <td
              className="px-4 border-l-2 border-2 underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white"
              onClick={() => showPaymentDetailHandler(item._id)}
            >
              View Detail
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PaymentTable;
