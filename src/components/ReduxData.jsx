import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/slices/orders";
import { setProducts } from "../../store/slices/products";

function ReduxData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders"
        );
        dispatch(setOrders(response.data));
      } catch (error) {}

      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/get_all_Products"
        );
        dispatch(setProducts(response.data));
      } catch (error) {}
    };
    fetchOrders();
  }, []);
  return <div></div>;
}

export default ReduxData;
