import React from "react";
import ShipmentForm from "@/components/ShipmentForm/ShipmentForm";
import { useRouter } from "next/router";
import axios from "axios";

function forward() {
  const router = useRouter();
  const { orderId } = router.query;

  const placeDispatchRequest = async (formData) => {
    let data =
      'format=json&data={\r\n\r\n    "shipments": [\r\n        {\r\n            "name": "Chandan",\r\n            "add": "Address",\r\n            "pin": "246761",\r\n            "city": "Dhampur",\r\n            "state": "Up",\r\n            "country": "India",\r\n            "phone": "7454914535",\r\n            "order": "123456",\r\n            "payment_mode": "Prepaid",\r\n            "return_pin": "",\r\n            "return_city": "",\r\n            "return_phone": "",\r\n            "return_add": "",\r\n            "return_state": "",\r\n            "return_country": "",\r\n            "products_desc": "",\r\n            "hsn_code": "",\r\n            "cod_amount": "0",\r\n            "order_date": "",\r\n            "total_amount": "100",\r\n            "seller_add": "",\r\n            "seller_name": "",\r\n            "seller_inv": "",\r\n            "quantity": "5",\r\n            "waybill": "25925310000022",\r\n            "shipment_width": "100",\r\n            "shipment_height": "100",\r\n            "weight": "500",\r\n            "seller_gst_tin": "",\r\n            "shipping_mode": "Surface",\r\n            "address_type": "home"\r\n        }\r\n    ],\r\n"pickup_location": {\r\n    "name": "Augse",\r\n    "add": "Address",\r\n    "city": "Dehradun",\r\n    "pin_code": 248005,\r\n    "country": "India",\r\n    "phone": "123456789"\r\n}\r\n}';

    console.log(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://track.delhivery.com/api/cmu/create.json",
      url: "https://staging-express.delhivery.com/api/cmu/create.json",
      headers: {
        Authorization: "Token 80c8c034e4624073a939ef481dbe1c98075e6b22",
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log(config);

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <ShipmentForm onSubmit={placeDispatchRequest} />;
}

export default forward;
