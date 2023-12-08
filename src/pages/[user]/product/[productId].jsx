import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";
import LoadingSpinner from "@/components/LoadingSpnner";

const ProductDetail = () => {
  const router = useRouter();
  const { user, productId } = router.query;
  const [product, setProduct] = useState({});
  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user != "sales" &&
      user != "accounts"
    ) {
      router.replace("/");
    }
  }, [user]);

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

  if (!product._id) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Product product={product} />;
    </div>
  );
};

export default ProductDetail;
