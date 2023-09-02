import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";

const ProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          process.env.NEXT_PUBLIC_SERVER_URL +
            `/products/product/${router.query.product}`
        );
        response ? setProduct(response.data) : null;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [router.query.product]);
  return <>{product._id ? <Product product={product} /> : null}</>;
};

export default ProductPage;
