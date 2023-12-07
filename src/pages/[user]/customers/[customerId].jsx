import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import AddressCard from "@/components/AddressCard";
import LoadingSpinner from "@/components/LoadingSpnner";

const CustomerDetailPage = () => {
  const [customer, setCustomer] = useState({});
  const [cancel, setCancel] = useState(0);
  const [returned, setReturned] = useState(0);
  const router = useRouter();
  const { user, customerId } = router.query;

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    if (typeof window !== undefined && user && user !== "admin") {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/user/detail/" + customerId,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        const canceledOrders = response.data.orders.filter(
          (order) => order.cancelled === true
        );
        const returnedOrders = response.data.orders.filter(
          (order) => order.isReturned === true
        );
        setCancel(canceledOrders.length);
        setReturned(returnedOrders.length);
        setCustomer(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [customerId]);

  if (!customer.address) {
    return <LoadingSpinner />;
  }

  const coinsAndCoupons = {
    totalCoins: 50,
    totalCoupons: 3,
  };

  return (
    <div className="text-gray-100 font-medium">
      <div className="mt-[1rem] ml-[2.5rem]">
        <BackButton />
      </div>
      <h1 className="ml-10 pt-3 mb-0 text-4xl font-semibold">Profile</h1>
      <div className="flex flex-col lg:flex-row mt-3 mr-4 ml-4 rounded-xl p-10 lg:space-x-4 bg-gray-100">
        <div className="lg:w-2/3 ">
          <p className="text-blue-800 text-3xl font-bold">{customer.name}</p>
          <p className="text-blue-600 text-lg mt-2">Email: {customer.email}</p>
          <p className="text-blue-600 text-lg">Phone: {customer.phone}</p>

          {customer.address.map((address, index) => (
            <AddressCard key={index} index={index} val={address} />
          ))}
        </div>
        {/* Right side */}
        <div className="lg:block lg:w-1/3 pt-10">
          {/* Render dynamic order details */}

          <div className="text-black mt-6  ">
            <h1 className="text-blue-500 font-bold text-[1.25rem] pb-5">
              Order(Amt)
            </h1>
            <p className="text-blue-400 pb-5">
              Total Order placed: {customer.orders.length}
            </p>
            <p className="text-blue-400 pb-5">Canceled Orders: {cancel}</p>
            <p className="text-blue-400 pb-5">Return Orders: {returned}</p>
          </div>

          {/* Render dynamic coins and coupons */}
          {/* <div className="text-black mt-10">
            <h1 className="text-blue-500 font-bold text-3xl pb-5">
              Coins/Coupons
            </h1>
            <p className="text-blue-400 pb-5">
              Total Coins: {coinsAndCoupons.totalCoins}
            </p>
            <p className="text-blue-400 pb-5">
              Total Coupons: {coinsAndCoupons.totalCoupons}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
