import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { useSelector } from "react-redux";
import SortableTable from "@/components/SortableTable";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpnner";

const Shipping = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = router.query;
  const orders = useSelector((state) => state.orders.pendingOrders);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user !== "sales"
    ) {
      router.replace("/");
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [user]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex-1 flex-wrap">
      <div className="mx-[1.5rem] mt-[1.3rem]">
        <BackButton />
      </div>
      <div className="mt-8 mb-12 px-4">
        <h1 className="font-bold  text-gray-100 pb-5 text-5xl">New Orders</h1>
        <SortableTable data={orders} />
      </div>
    </div>
  );
};

export default Shipping;
