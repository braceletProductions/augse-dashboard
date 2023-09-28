import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({});
  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          process.env.NEXT_PUBLIC_SERVER_URL + `/products/product/${productId}`,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        response ? setProduct(response.data) : null;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);

  if (!product._id) return <div className="">Loading...</div>;

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Product product={product} />;
    </div>
  );
};

export default ProductDetail;
