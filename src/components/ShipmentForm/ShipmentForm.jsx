import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import InputBox from "./InputBox";
import Dropdown from "./DropDown";
import DatePicker from "./DatePicker";
import axios from "axios";

const ShipmentForm = ({ onSubmit, orderId }) => {
  const [formData, setFormData] = useState({
    name: "",
    add: "",
    pin: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    order: "",
    payment_mode: "",
    return_pin: "",
    return_city: "",
    return_phone: "",
    return_add: "",
    return_state: "",
    return_country: "",
    products_desc: "",
    hsn_code: "",
    cod_amount: "",
    order_date: "",
    total_amount: "",
    seller_add: "",
    seller_name: "",
    seller_inv: "",
    quantity: "",
    waybill: "",
    shipment_width: "",
    shipment_height: "",
    weight: "",
    seller_gst_tin: "",
    shipping_mode: "",
    address_type: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (!orderId) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/orders/orders/" + orderId
        );
        const orderDetails = response.data;
        console.log(orderDetails);
        setFormData((prev) => ({
          ...prev,
          order: orderId,
          name: orderDetails.userId.name,
          phone: orderDetails.addressId.phone,
          add: `${orderDetails.addressId.name}, ${orderDetails.addressId.landmark}, ${orderDetails.addressId.street}`,
          city: orderDetails.addressId.city,
          pin: orderDetails.addressId.pinCode,
          state: orderDetails.addressId.state,
          country: orderDetails.addressId.country,
          payment_mode:
            orderDetails.paymentMode === "Online" ? "Prepaid" : "COD",
          cod_amount:
            orderDetails.paymentMode === "Online" ? "0" : orderDetails.price,
          total_amount: orderDetails.price,
          quantity: orderDetails.quantity.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          ),
          order_date: new Date(orderDetails.order_placed).toISOString(),
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [orderId]);

  const handleInputChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dateChangeHandler = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      order_date: date,
    }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="mx-[1rem] my-2">
          <BackButton />
        </div>
        <div className="bg-slate-50 w-full px-4 py-3 rounded-3xl">
          <div className="flex gap-4">
            <InputBox
              label="Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputBox
              label="Phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <InputBox
            label="Address"
            id="add"
            value={formData.add}
            onChange={handleInputChange}
          />
          <div className="flex gap-4">
            <InputBox
              label="Pincode"
              id="pin"
              value={formData.pin}
              onChange={handleInputChange}
            />
            <InputBox
              label="City"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <InputBox
              label="State"
              id="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <InputBox
              label="Country"
              id="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <Dropdown
              label="Address Type"
              options={[
                { label: "Home", value: "home" },
                { label: "Office", value: "office" },
              ]}
              id="address_type"
              selectedOption={formData.address_type}
              onSelect={handleInputChange}
            />
            <Dropdown
              label="Payment Mode"
              options={[
                { label: "Prepaid", value: "Prepaid" },
                { label: "COD", value: "COD" },
              ]}
              id="payment_mode"
              selectedOption={formData.payment_mode}
              onSelect={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <InputBox
              label="Order"
              id="order"
              value={formData.order}
              onChange={handleInputChange}
            />
            <Dropdown
              label="Shipment Mode"
              options={[
                { label: "Surface", value: "Surface" },
                { label: "Express", value: "Express" },
              ]}
              id="shipping_mode"
              selectedOption={formData.shipping_mode}
              onSelect={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <InputBox
              label="COD Amount"
              type="number"
              id="cod_amount"
              value={formData.cod_amount}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Order Date"
              selectedDate={formData.order_date}
              onDateChange={dateChangeHandler}
            />
          </div>
          <div className="flex gap-4">
            <InputBox
              label="Total Amount"
              type="number"
              id="total_amount"
              value={formData.total_amount}
              onChange={handleInputChange}
            />
            <InputBox
              label="Quantity"
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <InputBox
              label="Weight"
              type="number"
              id="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
            <div className="w-full flex gap-4">
              <InputBox
                label="Shipment Height"
                type="number"
                id="shipment_height"
                value={formData.shipment_height}
                onChange={handleInputChange}
              />
              <InputBox
                label="Shipment Width"
                type="number"
                id="shipment_width"
                value={formData.shipment_width}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className="ml-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            type="button"
            onClick={formSubmitHandler}
          >
            Place Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentForm;
