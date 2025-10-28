export const deriveTimeAndDate = (timestamp) => {
  if (!timestamp) return { date: "", time: "" };
  const dateObject = new Date(timestamp);

  // Format YYYY-MM-DD
  const date = dateObject.toISOString().slice(0, 10);

  // Format HH:MM (24h)
  const time = dateObject.toISOString().slice(11, 16);
  return { date, time };
}

export const getTimeZoneOffset = (timezone) => {
  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(date);
    console.log("PARTS", parts);
    const offset = parts.find((p) => p.type === "timeZoneName")?.value; // "UTC−05:00"
     // Spacing for readability
    return offset?.replace("UTC", "UTC ") || "";
  } catch {
    return "";
  }
}
