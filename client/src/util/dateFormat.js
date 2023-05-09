export const DateFormat = (dateVal) => {
  console.log(dateVal, "dateVal");

  // Check if dateVal is a valid date string
  if (!Date.parse(dateVal)) {
    return "";
  }

  const date = new Date(dateVal.toString());

  // Ensure that the date is in the same timezone as the server (UTC)
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const isoString = utcDate.toISOString();
  const formattedDate = isoString.substring(0, 10);

  return formattedDate;
};

export const handleKeyPress = (event) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  const regex = /^[0-9\b]+$/; // Allow numbers only
  if (!regex.test(keyValue)) {
    event.preventDefault();
  }
};
