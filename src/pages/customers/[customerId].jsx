import React from "react";
import { useRouter } from "next/router";
import customerData from "./customerData"; // Assuming customer.jsx is in the same directory

const CustomerDetailPage = () => {
  const router = useRouter();
  const { customerId } = router.query;

  // Fetch customer details based on customerId
  const selectedCustomer = customerData.find(
    (customer) => customer.id === parseInt(customerId)
  );

  if (!selectedCustomer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="text-gray-100">
      <h1 className="ml-10 pt-3 mb-0">Profile</h1>
      <div className="bg-gray-100 mt-3 mr-4 ml-4 rounded-xl  p-6">
        <p className="text-blue-900"> {selectedCustomer.name}</p>
        <p>Email: {selectedCustomer.email}</p>
        {/* Display more customer details here */}
      </div>
    </div>
  );
};

export default CustomerDetailPage;
