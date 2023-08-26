import { useRouter } from "next/router";
import customerData from "@/tempData/customerData";
import productData from "@/tempData/productData";

const TrackOrder = () => {
  const router = useRouter();
  const { customerId } = router.query;

  const selectedCustomer = customerData.find(
    (customer) => customer.id === parseInt(customerId)
  );

  if (!selectedCustomer) {
    return <div>Customer not found.</div>;
  }

  const selectedProduct = productData.find(
    (product) => product.id === selectedCustomer.productId
  );

  const circleColors = [
    "bg-red-500",
    "bg-blue-300",
    "bg-blue-500",
    "bg-green-300",
  ];

  return (
    <div>
      <div className="flex p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">Track Orders</h1>
        <div className="mt-10 bg-gray-100">
          <p className="bg-yellow-100">
            {selectedCustomer.name}
            <br />
            {selectedCustomer.email}
            <br />
            {selectedProduct.name}
            <br />
            {selectedProduct.description}
          </p>
        </div>
      </div>

      <div className="flex m-20 space-x-4 items-center">
        <div className="relative bg-gray-100 rounded-3xl p-10 flex space-x-4">
          {selectedProduct.tracking.map((statusInfo, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-full ${
                circleColors[index] || "bg-gray-300"
              } flex items-center justify-center`}
            >
              {index !== selectedProduct.tracking.length - 1 && (
                <svg
                  className="absolute w-12 h-12 top-0 left-0"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M5 50 A45 45 0 0 1 95 50"
                    stroke="gray"
                    strokeWidth="6"
                    fill="none"
                  />
                  <polygon points="90,50 85,46 85,54" fill="gray" />
                </svg>
              )}
              <p className="text-xs text-white">{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
