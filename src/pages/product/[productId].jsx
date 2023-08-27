// pages/product/[productId].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BackButton from "@/components/BackButton";
import Product from "@/components/Product";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `http://localhost:4001/api/v1/products/product/${router.query.productId}`;

      try {
        const response = await axios.get(apiUrl);
        if (response.data) {
          console.log(response.data);
          setProduct(response.data);

          setLoading(false);
        } else {
          console.log("eroor");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="surendraSinghKamboj">
        <h1 className="text-white">{product?._id}</h1>
      </div>
    );
  }
};

export default ProductDetail;
