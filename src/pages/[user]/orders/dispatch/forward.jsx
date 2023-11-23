import React from "react";
import ShipmentForm from "@/components/ShipmentForm/ShipmentForm";
import { useRouter } from "next/router";
import axios from "axios";

function forward() {
  const router = useRouter();
  const { orderId } = router.query;

  const placeDispatchRequest = async (formData) => {
    const data = {
      shipments: [formData],
      pickup_location: {
        name: "Augse",
        add: "Address",
        city: "Dehradun",
        pin_code: 248005,
        country: "India",
        phone: "123456789",
      },
      orderId: orderId,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/shipping/dispatch/forward",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <ShipmentForm onSubmit={placeDispatchRequest} />;
}

export default forward;
