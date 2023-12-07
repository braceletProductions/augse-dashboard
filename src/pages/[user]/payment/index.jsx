import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/router";
import PaymentTable from "@/components/Payment/PaymentTable";
import NoOrder from "@/components/NoOrder";
import DownloadButton from "@/components/Payment/DownloadButton";

const date = new Date();
const month = date.getMonth();
const startingYear = month > 2 ? date.getFullYear() : date.getFullYear() - 1;

function index() {
  const router = useRouter();
  const { user } = router.query;
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [isDownloading, setIsDownloading] = useState(false);
  const orders = useSelector((state) => state.orders.totalOrders);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "accounts"
    ) {
      router.replace("/");
    }
  }, [user]);

  const showPaymentDetailHandler = (orderId) => {
    router.push({
      pathname: "/" + user + "/track/" + orderId,
    });
  };

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  useEffect(() => {
    const currentDate = new Date();

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      switch (selectedPeriod) {
        case "thisMonth":
          return (
            orderDate.getFullYear() === currentDate.getFullYear() &&
            orderDate.getMonth() === currentDate.getMonth()
          );
        case "threeMonths":
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
          return orderDate >= threeMonthsAgo;
        case "sixMonths":
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
          return orderDate >= sixMonthsAgo;
        case "oneYear":
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
          return orderDate >= oneYearAgo;
        default:
          return true;
      }
    });

    setFilteredOrders(filteredOrders);
  }, [orders, selectedPeriod]);

  const downloadPdf = async () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.print();
    }, 500);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  if (filteredOrders.length === 0) return <NoOrder />;

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto p-4">
        {!isDownloading && <BackButton />}
        <div className="my-4 flex justify-between px-4">
          <div className="flex gap-4">
            <label htmlFor="period" className="text-white text-2xl">
              Select Time Period:
            </label>
            <select
              id="period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="cursor-pointer"
            >
              <option value="all">All</option>
              <option value="thisMonth">This Month</option>
              <option value="threeMonths">3 Months</option>
              <option value="sixMonths">6 Months</option>
              <option value="oneYear">
                FY ({startingYear}-{startingYear + 1})
              </option>
            </select>
          </div>
          {!isDownloading && (
            <DownloadButton
              isDownloading={isDownloading}
              onClick={downloadPdf}
            />
          )}
        </div>
        <div className="my-4">
          <PaymentTable
            orders={filteredOrders}
            showPaymentDetailHandler={showPaymentDetailHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default index;
