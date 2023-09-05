const dateFormatter = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Extract last two digits of the year

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export default dateFormatter;
