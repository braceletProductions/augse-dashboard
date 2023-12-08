import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";
import AddressCard from "@/components/AddressCard";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpnner";

const TrackOrder = () => {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { user, orderId } = router.query;

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30;
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user != "sales" &&
      user != "accounts"
    ) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!orderId) return;
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + orderId,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setOrder(res.data);
      } catch (error) {}
    };
    fetchDetails();
  }, [orderId]);

  const trackHandler = () => {
    Router.push({
      pathname: "/" + user + "/track/track",
      query: { orderId },
    });
  };

  const profileHandler = () => {
    Router.push({
      pathname: "/" + user + "/customers/" + order.userId._id,
    });
  };

  const downloadInvoice = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_SERVER_URL +
        "/invoice/download_Invoice/" +
        orderId;
      const response = await axios.get(url, {
        params: {
          timestamp: currentTimestamp,
        },
        responseType: "blob",
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.download = "invoice.pdf";
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.log(error);
    }
  };

  const readyToDispatchHandler = async () => {
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/orders/orders/readyToDispatch/" +
          orderId
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchedHandler = () => {
    router.push("/" + user + "/orders/dispatch/forward?orderId=" + orderId);
  };

  const generateShippingLabel = async () => {
    if (order.wayBill) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/shipping/shipmentLabel?wayBill=" +
            order.wayBill
        );
        for (let i = 0; i < response.data.data.packages_found; i++) {
          window.open(response.data.data.packages[i].pdf_download_link);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No wayBill found");
    }
  };

  console.log(order);

  if (order && order.userId)
    return (
      <div className="w-full font-medium">
        <div className="mt-[1.5rem] ml-[1.5rem]">
          <BackButton />
        </div>
        <div className="max-w-screen-2xl mx-auto p-[1.5rem]">
          <div className="bg-white min-h-screen rounded-3xl p-[2rem]">
            <div className="text-lg leading-6">
              <div className="text-2xl">{order.userId.name}</div>
              <p>{order.userId.email}</p>
              <p>{order.userId.phone}</p>
              {order.wayBill && <p>Waybill :{order.wayBill}</p>}
              <AddressCard val={order.addressId} />
            </div>
            <div className="lg:flex w-full gap-[2rem] text-xl my-[2rem]">
              <div className="flex-[5]">
                <div className="flex gap-[2rem]">
                  <div className="w-[40%]">Products</div>
                  <div className="w-[60%] flex justify-between border-l-4 border-blue-600 md:px-[2rem]">
                    <div className="">Product Cost</div>
                    <div className="">Quantity</div>
                    <div className="">Total</div>
                  </div>
                </div>
                {order.productName.map((name, index) => (
                  <div className="flex gap-[2rem]" key={index}>
                    <div className="w-[40%] my-[1rem]">
                      <div className="">{name}</div>
                      <div className="font-normal">
                        Product Code: {order.productId[index]}
                      </div>
                    </div>
                    <div className="w-[60%] border-l-4 border-blue-600 px-[2rem]">
                      <div className="my-[1rem] grid grid-cols-3 gap-[2rem] text-center text-blue-400">
                        <div className="">{order.productCost[index]}</div>
                        <div className="xl:pl-[4rem] md:pl-[2rem]">
                          {order.quantity[index]}
                        </div>
                        <div className="xl:pl-[8rem] md:pl-[4rem]">
                          {order.productCost[index] * order.quantity[index]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1 border-l-4 border-blue-600 px-[2rem]">
                <div className="">
                  <div className="flex mb-[0.5rem]">
                    <div className="">On the way :</div>
                    {order.status == "Dispatched" && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png"
                        className="ml-[1rem] h-[2rem]"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex mb-[0.5rem]">
                    <div className="">Delivered :</div>
                    {!!order.delivered && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png"
                        className="ml-[2rem] h-[2rem]"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex mb-[0.5rem]">
                    <div className="">Cancelled :</div>
                    {order.cancelled && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png"
                        className="ml-[2rem] h-[1.9rem]"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex mb-[0.5rem]">
                    <div className="">Returned :</div>
                    {order.isReturned && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png"
                        className="ml-[2.3rem] h-[2rem]"
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-2xl">
              Payment Status :
              <span
                className={`text-${[
                  order.payment_successful ? "green" : "red",
                ]}-600`}
              >
                {" "}
                {order.paymentMode} (
                {order.payment_successful ? "Successful" : "Failed"})
              </span>
            </div>
            <div className="text-white flex my-[2rem] justify-center gap-[5rem]">
              <Button text="Invoice" onClick={downloadInvoice} />
              <Button text="Profile" onClick={profileHandler} />
              <Button text="Track" onClick={trackHandler} />
              {order.wayBill && (
                <Button text="Shipping Label" onClick={generateShippingLabel} />
              )}
              {order.status == "Order Placed" && (
                <Button
                  text="Ready To Dispatch"
                  onClick={readyToDispatchHandler}
                />
              )}
              {order.status == "Ready To Dispatch" && (
                <Button text="Dispatched" onClick={dispatchedHandler} />
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return <LoadingSpinner />;
};

export default TrackOrder;
