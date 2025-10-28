import React, { useMemo } from "react";
import { getTimeZoneOffset } from "../utils/timeUtils";

// Relevant zones, may be expanded later
const TIMEZONES = [
  "Europe/Vienna",
  "Europe/Berlin",
  "Europe/London",
  "Europe/Paris",
  "Europe/Zurich",

  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
];

export default function TimeZoneSelect({ value, onChange }) {
  // Memo to avoid excess recalculations on every render
  const tzOptions = useMemo(() => {
    return TIMEZONES.map((timezone) => ({
      id: timezone,
      label: `${timezone} (${getTimeZoneOffset(timezone)})`,
    }));
  }, []);

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-700 font-semibold mb-1">Timezone</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded-lg border border-gray-300"
      >
        <option value="">Select timezone</option>
        {tzOptions.map((timezone) => (
          <option key={timezone.id} value={timezone.id}>
            {timezone.label}
          </option>
        ))}
      </select>
    </div>
  );
}

