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

  return (
    <div>
      <div className="flex p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">Track Orders</h1>
        <div>
          <p>
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

      <div className="flex m-20 space-x-4">
        <div className="bg-gray-100 rounded-3xl p-10 w-full h-full">
          {selectedProduct.tracking.map((statusInfo, index) => (
            <div key={index} className="flex items-center mb-4">
              <div
                className={`w-6 h-6 rounded-full ${
                  index === selectedProduct.tracking.length - 1
                    ? "bg-green-500"
                    : index === 2
                    ? "bg-blue-300"
                    : index === 3
                    ? "bg-blue-500"
                    : "bg-green-300"
                } mr-2 flex items-center justify-center`}
              >
                <p className="text-xs text-white">{index + 1}</p>
              </div>
              <p className="text-gray-700">{statusInfo.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
