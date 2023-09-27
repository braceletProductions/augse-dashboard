import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";

const TrackOrder = () => {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { user, orderId } = router.query;
  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchDetails = async () => {
      if (!orderId) return;
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + orderId,{
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

  if (order && order.userId)
    return (
      <div className="w-full font-medium">
        <div className="mt-[1.5rem] ml-[1.5rem]">
          <BackButton />
        </div>
        <div className="max-w-screen-2xl mx-auto p-[1.5rem]">
          <div className="bg-white min-h-screen rounded-3xl p-[2rem]">
            <div className="text-lg">
              <div className="text-2xl">{order.userId.name}</div>
              <div className="">{order.userId.email}</div>
              <div className="">{order.userId.phone}</div>
              <div className="">Address:</div>
              <div className="font-normal">
                <p className="text-black">
                  Street: {order.addressId.houseNumber} {order.addressId.street}
                </p>
                <p>Landmark: {order.addressId.landmark}</p>
                <p>City: {order.addressId.city}</p>
                <p>State/Province/Area: {order.addressId.state}</p>
                <p>Phone: {order.addressId.phone}</p>
                <p>Pin code: {order.addressId.pinCode}</p>
                <p>Country: {order.addressId.country}</p>
              </div>
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
                    {!!order.shipped && (
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
              <span className="text-green-600">
                {" "}
                {order.paymentMode} (
                {order.payment_successful ? "Successful" : "Pending"})
              </span>
            </div>
            <div className="text-white flex my-[2rem] justify-center gap-[5rem]">
              <div className="px-[1rem] py-[0.4rem] bg-blue-500 cursor-pointer shadow-black shadow-md active:shadow-none">
                Invoice
              </div>
              <div
                className="px-[1rem] py-[0.4rem] bg-blue-500 cursor-pointer shadow-black shadow-md active:shadow-none"
                onClick={profileHandler}
              >
                Profile
              </div>
              <div
                className="px-[1rem] py-[0.4rem] bg-blue-500 cursor-pointer shadow-black shadow-md active:shadow-none"
                onClick={trackHandler}
              >
                Track
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return <div>Order detail not found</div>;
};

export default TrackOrder;
