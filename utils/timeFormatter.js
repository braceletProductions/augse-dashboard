const timeFormatter = (dateString) => {
  const currentDate = new Date(dateString);

  const hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};

export default timeFormatter;
