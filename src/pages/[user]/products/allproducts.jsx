import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Router, { useRouter } from "next/router";
import formatToINR from "../../../../utils/currencyFormatter";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/LoadingSpnner";

function allproducts() {
  const router = useRouter();
  const { user } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products.totalProducts);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user != "sales"
    ) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const showOrderDetailHandler = (id) => {
    Router.push({
      pathname: "/" + user + "/product/" + id,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-[2rem] py-[1.5rem]">
        <BackButton />
        <div className="text-[2.45rem] text-white my-[1rem] font-medium">
          All Products
        </div>
        <table className="my-4 w-full border border-collapse">
          <thead>
            <tr className="bg-blue-800 text-gray-100 text-center">
              <th className="font-semibold lg:px-4 py-1">S.No.</th>
              <th className="font-semibold lg:px-4 py-1">Product Name</th>
              <th className="font-semibold lg:px-4 py-1">HSN Code</th>
              <th className="font-semibold lg:px-4 py-1">In Stock</th>
              <th className="font-semibold lg:px-4 py-1">Sold</th>
              <th className="font-semibold lg:px-4 py-1">Offered Price</th>
              <th className="font-semibold lg:px-4 py-1">View Count</th>
              <th className="font-semibold lg:px-4 py-1">Product Detail</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="bg-blue-200 text-center">
                <td className="px-4 border-l-2 border-2">{index + 1}</td>
                <td className="px-4 border-l-2 border-2">{item.productName}</td>
                <td className="px-4 border-l-2 border-2">{item.hsn}</td>
                <td className="px-4 border-l-2 border-2">{item.quantity}</td>
                <td className="px-4 border-l-2 border-2">{item.sold}</td>
                <td className="px-4 border-l-2 border-2">
                  {formatToINR(item.offeredPrice)}
                </td>
                <td className="px-4 border-l-2 border-2">{item.viewCount}</td>
                <td
                  className="px-4 border-l-2 border-2 underline text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white"
                  onClick={() => showOrderDetailHandler(item._id)}
                >
                  View Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default allproducts;
