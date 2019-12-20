const getFormattedDate = (string) => {
  const dateUTC = new Date(string);
  const date = dateUTC.toLocaleDateString();
  const time = dateUTC.toLocaleTimeString();
  return `${date} ${time}`;
};

export default getFormattedDate;
