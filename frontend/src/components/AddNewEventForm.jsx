import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, ArrowLeft } from "lucide-react";

import UniversalTextInput from "./UniversalTextInput";
import TimeZoneSelect from "./TimeZoneSelect";
import SportTypeSelect from "./SportTypeSelect";
import TeamSelect from "./TeamSelect";
import ShowToast from "./ShowToast";

import api from "../apis/api.js";
import logo from "../assets/logo.png";

const AddNewEventForm = ( { setSortedEvents } ) => {

  const [view, setView] = useState('main'); // 'main' or 'time' 
  
  const [teams, setTeams] = useState([]);
  const [availableSports, setAvailableSports] = useState([]); 
  const [sport, setSport] = useState("");
  
  const [homeTeamId, setHomeTeamId] = useState(null);
  const [opponentTeamId, setOpponentTeamId] = useState("");

  const [venue, setVenue] = useState("");  
  
  const [plannedDuration, setPlannedDuration] = useState(null); // In minutes
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("Europe/Vienna");

  const [description, setDescription] = useState("");

  // Initial available sport types fetch:
  useEffect(() => {
    const fetchSports = async () => {
      const response = await api.get("/events/get-sport-types");
      if (response?.data) {
        setAvailableSports(response.data || []);
      } else {
        ShowToast({
          image: logo,
          title: "Failed to Load Sports",
          subtitle: "Server error.",
         });
       }
     }
    fetchSports();
    }, []);
    
  const returnTeamSelectIssueDesc = (homeTeamId, opponentTeamId) => {
    let issue = "";
    if (!homeTeamId && !opponentTeamId) {
      issue = "Home & Opponent teams are not valid.";
    } else if (!homeTeamId) {
      issue = "Home team is not valid.";
    } else {
      issue = "Opponent team is not valid.";
    }
    return issue;
  }

  const handleSubmit = async (e) => {
    // Very basic validation for now
    const missingFields = [];
    
    if (!homeTeamId || !opponentTeamId) {
     const issue = returnTeamSelectIssueDesc(homeTeamId, opponentTeamId);
     ShowToast({
        image: logo,
        title: "Invalid Team Selection",
        subtitle: `${issue} Please select a registered team from the list.`,
        options: { toastId: "invalidTeamSelection" },
      });
      return;
    }
    
    if (!sport) missingFields.push("Sport");
    if (!date) missingFields.push("Date");
    if (!timezone) missingFields.push("Timezone");
    if (!time) missingFields.push("Time");
    if (!venue) missingFields.push("Venue");
    if (!description) missingFields.push("Description");
    if (!plannedDuration) missingFields.push("Planned Duration");

    if (missingFields.length > 0) {
      const missingList = missingFields.join(", ");
      ShowToast({
        image: logo,
        title: "Missing Required Fields",
        subtitle: `Please fill: ${missingList}.`,
        options: { toastId: "validationError" },
      });
      return;
    }
 
    e.preventDefault();
    const payload = {
      sport,
      homeTeamId,
      opponentTeamId,
      date,
      time,
      venue,
      plannedDuration, 
      description,
      timezone
    };
    
    try {
      const response = await api.post("/events/save-event", payload);
      console.log("RESP", response.data);
      
      if (response?.data) {
        const data = response.data;
        ShowToast({
          image: logo,
          title: "Success!",
          subtitle: "Event saved."
        });
        
        // Clear form fields
        setSport("");
        setHomeTeamId(null);
        setOpponentTeamId(null);
        setDate("");
        setTime("");
        setVenue("");
        setPlannedDuration(null);
        setDescription("");
        setTimezone("Europe/Vienna");
        
        // EventDisplay expects this structure
	const latestEvent = {
	  event_id: data.id,
	  event_start: data.event_start,
	  event_end: data.event_end,
	  event_place: data.event_place,
	  sport: data.sport,
	  home_team: data.home_team_name,
	  opponent_team: data.opponent_team_name,
	  description: data.desc,
	  event_timezone: data.event_timezone
	};

        // Update local state with event
        setSortedEvents((prevEvents) => [latestEvent, ...prevEvents]);

      } else {
        ShowToast({
          image: logo,
          title: "Failed to save event.",
          subtitle: "Server-error occurred."
        });
      }      
    } catch (errot) {
    
    }
  };
  
  const handleHomeTeamSelect = (teamId) => {
    if (opponentTeamId !== teamId) { // Can not play against itself
      setHomeTeamId(teamId);
      console.log(teamId);
    } else {
      ShowToast({
        image: logo,
        title: "Select different team.",
        subtitle: "You have already selected this team as opponent team.",
        options: { toastId: "validationError" },
      });
    }
  };

  const handleOpponentTeamSelect = (teamId) => {
    if (homeTeamId !== teamId) { // Can not play against itself
      setOpponentTeamId(teamId);
    } else {
      ShowToast({
        image: logo,
        title: "Select different team.",
        subtitle: "You have already selected this team as home team.",
        options: { toastId: "validationError" },
      });
    }
  };

  const handleSportTypeSelect = (sportType) => {
    setSport(sportType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8"
    >
      <div className="flex justify-center items-center space-x-2">
       <h1 className="text-3xl text-white font-bold mb-2 text-center">Add Event</h1>
       <CalendarPlus className="w-7 h-7 mb-3 text-white" />
      </div>
      
     <div className="flex min-h-2xl flex-col border border-gray-200 text-lg font-semibold text-black rounded-xl bg-white py-6 px-8 max-w-xl mx-auto space-y-2">
     
     <AnimatePresence mode="wait">
       {view === "main" &&
         <motion.div
           key="main"
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0 }}
           className="space-y-2"
         >
           <h3>Set Details</h3>
           <SportTypeSelect selectedSport={sport} sports={availableSports} onSelect={handleSportTypeSelect} />
           <TeamSelect teams={teams} setTeams={setTeams} label="Home Team" selectedTeam={homeTeamId} onSelect={handleHomeTeamSelect} />
           <TeamSelect teams={teams} setTeams={setTeams} label="Opponent Team" selectedTeam={opponentTeamId} onSelect={handleOpponentTeamSelect} />
           <UniversalTextInput
             label="Venue"
             value={venue}
             onChange={setVenue}
             maxLength={60}
             placeholder="Where event is held?"
           /> 
           <UniversalTextInput
             label="Description"
             value={description}
             onChange={setDescription}
             maxLength={200}
             placeholder="Major details?"
           />
         </motion.div>
       }

       {view === "time" &&
         <motion.div
           key="time"
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0 }}
           className="space-y-4"
         >
          <div className="flex space-x-2 justify-start items-center">
            <button onClick={() => { setView("main") }} className="cursor-pointer">
              <ArrowLeft className="w-8 h-8 hover:text-green-400" />
            </button>
            <h2>Go Back</h2>
          </div>
              
          <h3>Set Time & Duration</h3>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-semibold mb-1 w-25">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
        
        <TimeZoneSelect value={timezone} onChange={setTimezone} />
      

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Planned Duration (minutes)</label>
        <input
          type="number"
          min="10" // 10 min
          max="600" // 10 h
          step="5"
          value={plannedDuration}
          onChange={(e) => setPlannedDuration(e.target.value)}
          className="p-1 rounded-lg border border-gray-300"
          placeholder="e.g. 60"
        />
      </div>
         </motion.div>
       }
     </AnimatePresence>
     
        <motion.button
          onClick={view === 'main' ? (() => {setView("time")})  : handleSubmit}
          transition={{ duration: 0.2 }}
          type="submit"
          className={`${availableSports.length < 1 ? "cursor-not-allowed bg-gray-300" : "bg-green-600 hover:bg-green-400 cursor-pointer" } mt-4 py-2  text-white font-bold rounded-lg`}
          disabled={availableSports.length < 1}
        >
          {view === 'main' ? "Next" : "Add Event"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddNewEventForm;

