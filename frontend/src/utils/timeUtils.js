export const deriveTimeAndDate = (timestamp) => {
  if (!timestamp) return { date: "", time: "" };
  const dateObject = new Date(timestamp);

  // Format YYYY-MM-DD
  const date = dateObject.toISOString().slice(0, 10);

  // Format HH:MM (24h)
  const time = dateObject.toISOString().slice(11, 16);
  return { date, time };
}
