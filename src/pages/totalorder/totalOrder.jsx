import React, { useEffect, useState } from "react";
import axios from "axios";
import totalorderData from "@/tempData/totalorderData";

const TotalOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const apiUrl = "http://localhost:4001/api/v1/orders/orders";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setOrderData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Fallback to using the sample data if the API request fails
            setOrderData(totalorderData);
        }
    };

    return (
        <div className="flex-1 flex-wrap">
        <div className="mt-10 mb-12 px-4">
            <h1 className=" font-bold  text-gray-100 pb-5 text-5xl">
            Total Orders
            </h1>
            {orderData.map((ele) => (
                <div
                    key={ele.id}
                    className="flex  gap-5 mb-10"
                >
                    <div className="w-2/5 bg-white border-2  p-4 rounded-l-lg">
                        <h1 className="text-4xl font-semibold text-blue-900 mb-2">
                            {ele.name}
                        </h1>
                        <p className="text-2xl text-blue-500">
                            {ele.email}
                        </p>
                    </div>
                    <div className="w-3/5 bg-white border-2  p-4 rounded-r-lg flex justify-between">
                        <div className="mr-4">
                            <h2 className="text-4xl font-semibold text-blue-900">
                                {ele.sareename}
                            </h2>
                            <p className="text-2xl text-blue-500">
                                {ele.desc}
                            </p>
                        </div>
                        <div className="flex flex-wrap w-2/5 h-20 justify-between">
                            <button className="bg-blue-900 text-white rounded-lg px-4 py-2 text-2xl" style={{width: "190px", height: "50px"}}>
                                Product Detail
                            </button>
                            <button className="bg-blue-900 text-white rounded-lg px-4 py-2 text-2xl" style={{width: "120px", height: "50px"}}>
                                Track
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default TotalOrder;
