// pages/product/[productId].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import customerData from "@/tempData/customerData";
import productData from "@/tempData/productData";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  console.log("ProductId from URL:", productId);

  const matchingCustomers = customerData.filter(
    (customer) => parseInt(customer.productId) === parseInt(productId)
  );

  const matchingProducts = productData.filter(
    (product) => parseInt(product.id) === parseInt(productId)
  );

  console.log("Customers with matching productId:", matchingCustomers);

  if (!matchingCustomers.length) {
    console.log("Product not found");
    return <div>Product not found</div>;
  }

  const customer = matchingCustomers[0]; // Take the first matching customer
  const product = matchingProducts[0]; // Take the first matching customer

  return (
    <div className="bg-gray-100 m-10 p-10 rounded-3xl text-xl text-blue-500">
      <h1 className="text-blue-900 text-2xl"> Product Detail</h1>
      <p> {product.id}</p>
      <p> {product.description}</p>
      <p>Price: {product.price}</p>

      {/* Display other customer details */}
    </div>
  );
};

export default ProductDetail;
