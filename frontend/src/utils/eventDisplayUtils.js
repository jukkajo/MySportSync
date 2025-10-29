export const isLive = (event) => {
  if (!event?.event_start || !event?.event_end) return false;
  // ms since epoch (UTC)
  const now = Date.now();
  // Utc aligned timestamps
  const start = new Date(event.event_start).getTime();
  const end = new Date(event.event_end).getTime();
  // timezone-neutral comparison
  return start <= now && now <= end;
}

// Aplies filters and modifies event list
export const sortEvents = (list, option, setSortedEvents) => {
  console.log("LST:", list);
  let sorted = [...list];
  const now = Date.now();

  switch (option) {
    // Older
    case "date-asc":
      sorted.sort((a, b) => new Date(a.event_start) - new Date(b.event_start));
      break;
    // Newer
    case "date-desc":
      sorted.sort((a, b) => new Date(b.event_start) - new Date(a.event_start));
      break;
    // By sport name from a to z
    case "sportname-asc":
      sorted.sort((a, b) => a.sport.localeCompare(b.sport));
      break;
    // From z to a
    case "sportname-desc":
      sorted.sort((a, b) => b.sport.localeCompare(a.sport));
      break;
    // Events that are consired live
    case "date-asc-2":
    
     // Order: Live -> Upcoming -> Newest past events 
     const liveEvents = list.filter(e => isLive(e));
     const upcomingEvents = list.filter(e => new Date(e.event_start).getTime() > now);
     const pastEvents = list.filter(e => new Date(e.event_end).getTime() < now);
     sorted = [
        ...liveEvents.sort((a, b) => new Date(a.event_start) - new Date(b.event_start)),
        ...upcomingEvents.sort((a, b) => new Date(a.event_start) - new Date(b.event_start)),
        ...pastEvents.sort((a, b) => new Date(b.event_start) - new Date(a.event_start)) 
     ];
     
     break;

    default:
      break;
  }
  setSortedEvents(sorted);
};

