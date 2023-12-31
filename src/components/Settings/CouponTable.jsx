import axios from "axios";
import React, { useEffect, useState } from "react";
import dateFormatter from "../../../utils/dateFormatter";

const CouponTable = () => {
  const [couponData, setCouponData] = useState([]);

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchCouponDetail = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/rewards/coupon/special",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCouponData(response.data.coupons);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCouponDetail();
  }, []);

  return (
    <div className="container">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-gray-100 text-center">
            <th className="font-semibold px-4 py-1">S.No.</th>
            <th className="font-semibold px-4 py-1">Code</th>
            <th className="font-semibold px-4 py-1">Discount</th>
            <th className="font-semibold px-4 py-1">Expiry Date</th>
            <th className="font-semibold px-4 py-1">Used</th>
          </tr>
        </thead>
        <tbody>
          {couponData.map((item, index) => (
            <tr key={index} className="bg-blue-200 text-center">
              <td className="px-4 border-l-2 border-2">{index + 1}</td>
              <td className="px-4 border-l-2 border-2">{item.code}</td>
              <td className="px-4 border-l-2 border-2">
                {item.discountPercentage}%
              </td>
              <td className="px-4 border-l-2 border-2">
                {dateFormatter(item.expiryDate)}
              </td>
              <td className="px-4 border-l-2 border-2">{item.used.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
