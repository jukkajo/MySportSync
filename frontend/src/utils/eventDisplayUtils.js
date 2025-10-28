export const isLive = (event) => {
  const timeNow = new Date();
  const start = new Date(event.event_start);
  const end = new Date(event.event_end);
  return start <= timeNow && timeNow <= end;
};

// Aplies filters and modifies event list
export const sortEvents = (list, option, setSortedEvents) => {
  console.log("LST:", list);
  const sorted = [...list];
 
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
    
     // Live 
     const liveEvents = list.filter(e => {
       const start = new Date(e.event_start);
       const end = new Date(e.event_end);
       return start <= now && now <= end; // started but not finished
     });

  const upcomingEvents = list.filter(e => new Date(e.event_start) > now);

      break;
    case "date-asc-3":
    
    default:
      break;
  }

  setSortedEvents(sorted);
};

