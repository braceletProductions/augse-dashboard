import React, { useState } from "react";
import { useRouter } from "next/router";
import customerData from "@/tempData/customerData";
import axios from "axios";
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
  //Dynamic Order details and coins/coupons

  const [orders, setOrders] = useState([
    { id: 1, amount: 100 },
    { id: 2, amount: 150 },
    // ... add more orders
  ]);

  const totalOrderAmt = orders.reduce(
    (total, order) => total + order.amount,
    
  );

  const coinsAndCoupons = {
    totalCoins: 50,
    totalCoupons: 3,
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/v1/user/me/${customerId}`);
        setSelectedCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setSelectedCustomer(null);
      }
    };

    fetchCustomer();
  }, [customerId]);

  return (
    <div className="text-gray-100 font-medium ">
      <h1 className="ml-10 pt-3 mb-0">Profile</h1>
      <div className="flex flex-col lg:flex-row mt-3 mr-4 ml-4 rounded-xl p-10 lg:space-x-4 bg-gray-100">
        <div className="lg:w-2/3 ">
          <p className="text-blue-800  text-3xl font-bold">
            {selectedCustomer.name}
          </p>
          <p className="text-blue-600">{selectedCustomer.email}</p>
          <p className="text-blue-600">{selectedCustomer.phone}</p>

          {/* Render address information */}
          <div className="text-black mt-6 lg:mt-10">
            <h1 className="text-blue-300  font-bold">Address 1</h1>
            <p className="text-black">
              Street: {selectedCustomer.address1.street}
            </p>
            <p>City: {selectedCustomer.address1.city}</p>
            <p>State/Province/Area: {selectedCustomer.address1.state}</p>
            <p>Phone: {selectedCustomer.address1.phone_number}</p>
            <p>Zip code: {selectedCustomer.address1.Zip_code}</p>
            <p>
              Country calling code:{" "}
              {selectedCustomer.address1.country_calling_code}
            </p>
            <p>Country: {selectedCustomer.address1.country}</p>

            {/* Render more address details as needed */}
          </div>
          <div className="text-black mt-10">
            <h1 className="text-blue-300  font-bold">Address 2</h1>
            <p className="text-black">
              Street: {selectedCustomer.address2.street}
            </p>
            <p>City: {selectedCustomer.address2.city}</p>
            <p>State/Province/Area: {selectedCustomer.address2.state}</p>
            <p>Phone: {selectedCustomer.address2.phone_number}</p>
            <p>Zip code: {selectedCustomer.address2.Zip_code}</p>
            <p>
              Country calling code:{" "}
              {selectedCustomer.address2.country_calling_code}
            </p>
            <p>Country: {selectedCustomer.address2.country}</p>
          </div>
        </div>
        {/* Right side */}
        <div className="  lg:block w-1/3 pt-10  ">
          {/* Render dynamic order details */}
          <div className="text-black mt-6  ">
            <h1 className="text-blue-500 font-bold pb-5">Order(Amt)</h1>
            <p className="text-blue-400 pb-5">
              Total Order placed: {orders.length}
            </p>

            <p className="text-blue-400 pb-5">
              Canceled Orders: {orders.cancelOrders}
            </p>
            <p className="text-blue-400 pb-5">
              Return Orders: {orders.returnOders}
            </p>
          </div>

          {/* Render dynamic coins and coupons */}
          <div className="text-black mt-14">
            <h1 className="text-blue-500 font-bold pb-5">Coins/Coupons</h1>
            <p className="text-blue-400 pb-5">
              Total Coins: {coinsAndCoupons.totalCoins}
            </p>
            <p className="text-blue-400 pb-5">
              Total Coupons: {coinsAndCoupons.totalCoupons}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
