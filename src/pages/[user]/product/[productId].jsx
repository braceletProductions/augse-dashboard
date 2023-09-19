import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          process.env.NEXT_PUBLIC_SERVER_URL + `/products/product/${productId}`
        );
        response ? setProduct(response.data) : null;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);

  if (!product._id) return <div className="">Loading...</div>;

  return <Product product={product} />;
};

export default ProductDetail;
