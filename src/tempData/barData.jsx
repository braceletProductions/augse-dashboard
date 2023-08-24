import categoryData from "./categoryData";
const barData = {
  labels: categoryData.map((item) => item.category), // Extract category names as labels
  datasets: [
    {
      label: "Order segregated based on category",
      data: categoryData.map((item) => item.count), // Extract count values as data
      backgroundColor: ["#153e64"], // Add more colors if needed
    },
  ],
};

export default barData;
