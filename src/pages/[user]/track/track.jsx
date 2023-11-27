import BackButton from "@/components/BackButton";
import axios from "axios";
import { useRouter } from "next/router";
import dateFormatter from "../../../../utils/dateFormatter";
import { useEffect, useState } from "react";
import timeFormatter from "../../../../utils/timeFormatter";
import LoadingSpinner from "@/components/LoadingSpnner";

const TrackOrder = () => {
  const [order, setOrder] = useState({});
  const [trackData, setTrackData] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchDetails = async () => {
      if (!orderId) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + orderId,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {}
    };
    fetchDetails();
  }, [orderId]);

  useEffect(() => {
    const track = async () => {
      if (!order.wayBill) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/shipping/track?wayBill=" +
            order.wayBill
        );
        setTrackData(response.data.ShipmentData[0].Shipment);
      } catch (error) {
        console.log(error);
      }
    };
    track();
  }, [order]);

  if (!order.userId) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="py-[2rem] px-[4rem]">
        <BackButton />
        <h1 className="text-4xl my-[1rem] font-bold mb-4 text-gray-100">
          Track Orders
        </h1>
        <div className="mt-[2rem] text-blue-500">
          <div className="flex justify-between">
            <div className="px-[2rem] max-w-fit bg-white rounded-3xl py-1">
              <div className="text-3xl font-medium">{order.userId.name}</div>
              <div className="text-2xl">{order.userId.email}</div>
            </div>
            <div className="px-[2rem] max-w-fit bg-white rounded-3xl py-1">
              <div className="text-xl">WayBill: {order.wayBill}</div>
              <div className="text-xl">
                Warehouse: {trackData.PickupLocation}
              </div>
            </div>
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
                  {trackData.PickUpDate
                    ? dateFormatter(trackData.PickUpDate)
                    : "Pending"}
                </div>
                <div>
                  {trackData.PickUpDate && timeFormatter(trackData.PickUpDate)}
                </div>
              </div>
            </div>
            <div className="w-[10rem] h-[5rem] flex relative justify-center rounded-t-full bg-blue-500">
              <div className="w-[8rem] h-[8rem] bg-blue-500 rounded-full border-[1rem] text-white my-[1rem] border-[white] flex flex-col justify-center items-center">
                <div>
                  {trackData.OutDestinationDate
                    ? dateFormatter(trackData.OutDestinationDate)
                    : "Pending"}
                </div>
                <div>
                  {trackData.OutDestinationDate &&
                    timeFormatter(trackData.OutDestinationDate)}
                </div>
              </div>
              <div className="absolute top-[4rem] z-20 -right-3 border-l-[20px] border-l-transparent border-t-[30px] border-t-blue-500 border-r-[20px] border-r-transparent"></div>
            </div>
            <div className="w-[10rem] h-[5rem] flex relative my-[5rem] -translate-x-4 justify-center rounded-b-full bg-[#3b58dc] border-[black]">
              <div className="w-[8rem] h-[8rem] text-white bg-[#3b58dc] rounded-full border-[1rem] absolute bottom-[1rem]  border-[white] flex flex-col justify-center items-center">
                <div>
                  {trackData.DeliveryDate
                    ? dateFormatter(trackData.DeliveryDate)
                    : "Pending"}
                </div>
                <div>
                  {trackData.DeliveryDate &&
                    timeFormatter(trackData.DeliveryDate)}
                </div>
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
