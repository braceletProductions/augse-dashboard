import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/slices/orders";
import { setProducts } from "../../store/slices/products";
import { useRouter } from "next/router";
import { useState } from "react";
import { Fragment } from "react";

function ReduxData() {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  if (
    router.pathname !== "/" &&
    router.pathname !== "/_error" &&
    dataFetched === false
  ) {
    setDataFetched(true);
  }

  const fetchOrders = async () => {
    console.log("fetching data");
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders",
        {
          params: {
            timestamp: currentTimestamp,
          },
        }
      );
      dispatch(setOrders(response.data));
    } catch (error) {}

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/products/get_all_Products",
        {
          params: {
            timestamp: currentTimestamp,
          },
        }
      );
      dispatch(setProducts(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !== "/_error") {
      fetchOrders();
    }
  }, [dataFetched]);

  return <Fragment />;
}

export default ReduxData;
