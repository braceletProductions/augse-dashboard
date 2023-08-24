// pages/product/[productId].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import customerData from "@/tempData/customerData";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  console.log("ProductId from URL:", productId);

  const matchingCustomers = customerData.filter(
    (customer) => customer.productId === productId
  );

  console.log("Customers with matching productId:", matchingCustomers);

  if (!matchingCustomers.length) {
    console.log("Product not found");
    return <div>Product not found</div>;
  }

  const customer = matchingCustomers[0]; // Take the first matching customer

  return (
    <div>
      <h1>{customer.name}'s Product Detail</h1>
      <p>Email: {customer.email}</p>
      {/* Display other customer details */}
    </div>
  );
};

export default ProductDetail;
