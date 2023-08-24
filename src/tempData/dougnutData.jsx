import orderData from "./orderData";
const doughnutData = {
  labels: ["Canceled", "Returned", "Delivered", "Shipped", "Pending"],
  datasets: [
    {
      data: [
        orderData.canceled,
        orderData.returned,
        orderData.delivered,
        orderData.shipped,
        orderData.pending,
      ],
      backgroundColor: ["#153e64", "#03284a", "#33f9f9", "#08b7c2", "#177cac"],
    },
  ],
};

export default doughnutData;
