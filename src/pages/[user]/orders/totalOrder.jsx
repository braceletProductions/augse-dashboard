import React, { useEffect } from "react";
import BackButton from "@/components/BackButton";
import { useSelector } from "react-redux";
import SortableTable from "@/components/SortableTable";
import NoOrder from "@/components/NoOrder";
import { useRouter } from "next/router";

const totalOrder = () => {
  const router = useRouter();
  const { user } = router.query;
  const orders = useSelector((state) => state.orders.totalOrders);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user !== "sales"
    ) {
      router.redirect("/");
    }
  }, [user]);

  if (orders.length === 0) return <NoOrder />;

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex-1 flex-wrap">
          <div className="mx-[1.5rem] mt-[1.3rem]">
            <BackButton />
          </div>
          <div className="mt-8 mb-12 px-4">
            <h1 className="font-bold  text-gray-100 pb-5 text-5xl">
              Total Orders
            </h1>
            <SortableTable data={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default totalOrder;
