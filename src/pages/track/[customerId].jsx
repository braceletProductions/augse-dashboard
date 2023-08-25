import { useRouter } from "next/router";
import customerData from "@/tempData/customerData";
import productData from "@/tempData/productData";

const TrackOrder = () => {
  const router = useRouter();
  const { customerId } = router.query;
  console.log("customerId:", customerId);

  const selectedCustomer = customerData.find(
    (customer) => customer.id === parseInt(customerId)
  );
  console.log("selectedCustomer:", selectedCustomer);

  if (!selectedCustomer) {
    return <div>Customer not found.</div>;
  }

  const selectedProduct = productData.find(
    (product) => product.id === selectedCustomer.productId
  );
  console.log("selectedProduct:", selectedProduct);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tracking Information</h1>
      <p>
        Customer: {selectedCustomer.name}
        <br />
        Product: {selectedProduct.name}
      </p>
      <div className="mt-4">
        {selectedProduct.tracking.map((statusInfo, index) => (
          <div key={index} className="flex items-center mb-2">
            <div
              className={`w-4 h-4 rounded-full ${
                index === selectedProduct.tracking.length - 1
                  ? "bg-green-500"
                  : "bg-gray-300"
              } mr-2`}
            />
            <p>{statusInfo.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
