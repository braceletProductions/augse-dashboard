import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/slices/orders";
import { setProducts } from "../../store/slices/products";

function ReduxData() {
  const dispatch = useDispatch();

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchOrders = async () => {
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
    fetchOrders();
  }, []);
  return <div></div>;
}

export default ReduxData;
