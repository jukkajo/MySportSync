import { dateTimeToUTCRelativeToTz } from "./timeUtils";

/* Validates form input when user creates new event.
   Returns: { valid: boolean, errorTitle: string, errorMessage: string }
*/
export function validateEventForm({ sport, date, time, timezone, venue, description, plannedDuration, homeTeamId, opponentTeamId }) {
  // Check for required fields
  const missingFields = [];
  if (!sport) missingFields.push("Sport");
  if (!date) missingFields.push("Date");
  if (!timezone) missingFields.push("Timezone");
  if (!time) missingFields.push("Time");
  if (!venue) missingFields.push("Venue");
  if (!description) missingFields.push("Description");
  if (!plannedDuration) missingFields.push("Planned Duration");

  if (missingFields.length > 0) {
    return {
      valid: false,
      errorTitle: "Missing Required Fields",
      errorMessage: `Please fill: ${missingFields.join(", ")}.`,
    };
  }

  // Team validity check: are teams selected and is not same team?
  if (!homeTeamId || !opponentTeamId) {
    let msg = "";
    if (!homeTeamId && !opponentTeamId) msg = "Home & Opponent teams are not valid.";
    else if (!homeTeamId) msg = "Home team is not valid.";
    else msg = "Opponent team is not valid.";

    return {
      valid: false,
      errorTitle: "Invalid Team Selection",
      errorMessage: `${msg} Please select a registered team from the list.`,
    };
  }

  // Guarding against past date/time based on event's timezone
  const dateTimeString = `${date}T${time}:00`;
  const eventStartUTC = dateTimeToUTCRelativeToTz(dateTimeString, timezone);
  const nowUTC = Date.now();

  if (nowUTC > eventStartUTC) {
    return {
      valid: false,
      errorTitle: "Invalid Event Time",
      errorMessage: "Please choose a future date/time.",
    };
  }

  return { valid: true };
}

