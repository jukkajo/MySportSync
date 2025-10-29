/* Converts a local date-time string interpreted in a specific timezone,
   into a UTC timestamp.
*/
export const dateTimeToUTCRelativeToTz = (dateTimeString, timezone) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(new Date(dateTimeString))
    .reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});

  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute
  );
}

// Extracts date: "YYYY-MM-DD" and time: "HH:MM" from a timestamp
export const deriveTimeAndDate = (timestamp) => {
  if (!timestamp) return { date: "", time: "" };
  const dateObject = new Date(timestamp);

  // Format YYYY-MM-DD
  const date = dateObject.toISOString().slice(0, 10);

  // Format HH:MM (24h)
  const time = dateObject.toISOString().slice(11, 16);
  return { date, time };
}

/*  Returns the timezone offset (e.g. "UTC +01:00") for a given
    IANA-formatted timezone (e.g "Europe/Vienna").
*/
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
