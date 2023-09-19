import BackButton from "@/components/BackButton";
import axios from "axios";
import { useRouter } from "next/router";
import dateFormatter from "../../../../utils/dateFormatter";
import { useEffect, useState } from "react";
import timeFormatter from "../../../../utils/timeFormatter";

const TrackOrder = () => {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!orderId) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + orderId
        );
        setOrder(response.data);
      } catch (error) {}
    };
    fetchDetails();
  }, [orderId]);

  if (!order.userId) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <div className="py-[2rem] px-[4rem]">
        <BackButton />
        <h1 className="text-4xl my-[1rem] font-bold mb-4 text-gray-100">
          Track Orders
        </h1>
        <div className="mt-[2rem] text-blue-500">
          <div className="px-[2rem] max-w-fit bg-white rounded-3xl py-1">
            <div className="text-3xl font-medium">{order.userId.name}</div>
            <div className="text-2xl">{order.userId.email}</div>
          </div>
          <div className="bg-white flex w-[45rem] h-[14rem] rounded-t-3xl mt-[5rem] relative m-auto p-[2rem]">
            <div className="absolute top-[6rem] left-[12.3rem] z-20 border-l-[20px] border-l-transparent border-t-[30px] border-t-[#58dcd5] border-r-[20px] border-r-transparent"></div>
            <div className="absolute z-20 top-[5.9rem] left-[21.2rem] border-l-[20px] rotate-180 border-l-transparent border-t-[30px] border-t-[#3ce88a] border-r-[20px] border-r-transparent"></div>
            <div className="w-[10rem] h-[5rem] translate-x-8 flex relative justify-center rounded-t-full bg-[#58dcd5]">
              <div className="w-[8rem] h-[8rem] bg-[#58dcd5] text-white rounded-full border-[1rem] my-[1rem] border-[white] flex flex-col justify-center items-center">
                <div>
                  {order.order_placed
                    ? dateFormatter(order.order_placed)
                    : "Pending"}
                </div>
                <div>
                  {order.order_placed && timeFormatter(order.order_placed)}
                </div>
              </div>
            </div>
            <div className="w-[10rem] h-[5rem] flex relative my-[5rem] translate-x-4 justify-center rounded-b-full bg-[#3ce88a] border-[black]">
              <div className="w-[8rem] h-[8rem] bg-[#3ce88a] text-white rounded-full border-[1rem] absolute bottom-[1rem] border-[white] flex flex-col justify-center items-center">
                <div>
                  {order.shipped ? dateFormatter(order.shipped) : "Pending"}
                </div>
                <div>{order.shipped && timeFormatter(order.shipped)}</div>
              </div>
            </div>
            <div className="w-[10rem] h-[5rem] flex relative justify-center rounded-t-full bg-blue-500">
              <div className="w-[8rem] h-[8rem] bg-blue-500 rounded-full border-[1rem] text-white my-[1rem] border-[white] flex flex-col justify-center items-center">
                <div>
                  {order.outForDelivery
                    ? dateFormatter(order.outForDelivery)
                    : "Pending"}
                </div>
                <div>
                  {order.outForDelivery && timeFormatter(order.outForDelivery)}
                </div>
              </div>
              <div className="absolute top-[4rem] z-20 -right-3 border-l-[20px] border-l-transparent border-t-[30px] border-t-blue-500 border-r-[20px] border-r-transparent"></div>
            </div>
            <div className="w-[10rem] h-[5rem] flex relative my-[5rem] -translate-x-4 justify-center rounded-b-full bg-[#3b58dc] border-[black]">
              <div className="w-[8rem] h-[8rem] text-white bg-[#3b58dc] rounded-full border-[1rem] absolute bottom-[1rem]  border-[white] flex flex-col justify-center items-center">
                <div>
                  {order.delivered ? dateFormatter(order.delivered) : "Pending"}
                </div>
                <div>{order.delivered && timeFormatter(order.delivered)}</div>
              </div>
              <div className="absolute z-20 -top-[1.4rem] -right-3 border-l-[20px] rotate-180 border-l-transparent border-t-[30px] border-t-[#3b58dc] border-r-[20px] border-r-transparent"></div>
            </div>
          </div>
          <div className="bg-white flex w-[45rem] text-center text-lg rounded-b-3xl mb-[5rem] relative m-auto p-[2rem] text-black font-semibold">
            <div className="w-[11rem]">Order Confirmed</div>
            <div className="w-[11rem]">Shipped</div>
            <div className="w-[11rem]">Out for delivery</div>
            <div className="w-[11rem]">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
