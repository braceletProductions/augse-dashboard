import React, { Fragment, useState } from "react";
import formatToINR from "../../utils/currencyFormatter";
import Router, { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import ConfirmDeleteOrder from "./ConfirmDeleteOrder";
import axios from "axios";
import { toast } from "react-toastify";

function SortableTable({ data }) {
  const router = useRouter();
  const { user } = router.query;
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (columnName) => {
    const newSortOrder =
      sortBy === columnName && sortOrder === "asc" ? "desc" : "asc";

    let sortedDataCopy;
    if (columnName === "createdAt") {
      sortedDataCopy = [...sortedData].sort((a, b) => {
        const aValue = new Date(a[columnName]);
        const bValue = new Date(b[columnName]);

        if (newSortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    } else {
      sortedDataCopy = [...sortedData].sort((a, b) => {
        if (newSortOrder === "asc") {
          return a[columnName] - b[columnName];
        } else {
          return b[columnName] - a[columnName];
        }
      });
    }

    setSortedData(sortedDataCopy);
    setSortBy(columnName);
    setSortOrder(newSortOrder);
  };

  const showOrderDetailHandler = (id) => {
    Router.push({
      pathname: "/" + user + "/track/" + id,
    });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + deleteOrderId
      );
      toast.error(response.data.message);
      const filteredOrder = sortedData.filter(
        (data) => data._id !== deleteOrderId
      );
      setSortedData(filteredOrder);
      setDeleteOrderId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {deleteOrderId && (
        <ConfirmDeleteOrder
          orderId={deleteOrderId}
          onCancel={() => setDeleteOrderId(false)}
          onDelete={confirmDelete}
        />
      )}
      <table className="my-4 w-full border border-collapse">
        <thead>
          <tr className="bg-blue-800 text-gray-100 text-center">
            <th className="font-semibold px-4 py-1">S.No.</th>
            <th className="font-semibold px-4 py-1">Customer Name</th>
            <th className="font-semibold px-4 py-1">Customer Email</th>
            <th className="font-semibold px-4 py-1">Order Id</th>
            <th
              className="font-semibold px-4 py-1 relative cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Order Date{" "}
              {sortBy === "createdAt" && (
                <img
                  src="https://www.freeiconspng.com/thumbs/white-arrow-png/curved-white-arrow-png-0.png"
                  className={`h-[1rem] absolute top-2 right-1  + ${
                    sortOrder == "desc" && "rotate-180"
                  }`}
                />
              )}
            </th>
            <th
              className="font-semibold px-4 py-1 relative cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Order Price{" "}
              {sortBy === "price" && (
                <img
                  src="https://www.freeiconspng.com/thumbs/white-arrow-png/curved-white-arrow-png-0.png"
                  className={`h-[1rem] absolute top-2 right-1  + ${
                    sortOrder == "desc" && "rotate-180"
                  }`}
                />
              )}
            </th>
            <th className="font-semibold px-4 py-1">Payment Mode</th>
            <th
              className="font-semibold px-4 py-1 relative cursor-pointer"
              onClick={() => handleSort("payment_successful")}
            >
              Payment Status{" "}
              {sortBy === "payment_successful" && (
                <img
                  src="https://www.freeiconspng.com/thumbs/white-arrow-png/curved-white-arrow-png-0.png"
                  className={`h-[1rem] absolute top-2 right-1  + ${
                    sortOrder == "desc" && "rotate-180"
                  }`}
                />
              )}
            </th>
            <th className="font-semibold px-4 py-1">Order Detail</th>
            <th className="font-semibold px-4 py-1">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="bg-blue-200 text-center">
              <td className="px-4 border-l-2 border-2">{index + 1}</td>
              <td className="px-4 border-l-2 border-2">{item.userId.name}</td>
              <td className="px-4 border-l-2 border-2">{item.userId.email}</td>
              <td className="px-4 border-l-2 border-2">{item._id}</td>
              <td className="px-4 border-l-2 border-2">
                {item.createdAt.substring(0, 10)}
              </td>
              <td className="px-4 border-l-2 border-2">
                {formatToINR(item.price)}
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
                onClick={() => showOrderDetailHandler(item._id)}
              >
                View Detail
              </td>
              <td
                className="px-4 border-l-2 border-2 underline cursor-pointer hover:bg-red-600 text-red-600 hover:text-white"
                onClick={() => {
                  setDeleteOrderId(item._id);
                }}
              >
                <AiFillDelete size={20} className="mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default SortableTable;
