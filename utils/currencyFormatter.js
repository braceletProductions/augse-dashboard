function formatToINR(number) {
  if (isNaN(number)) {
    return "Invalid input";
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(number);
}
export default formatToINR;
