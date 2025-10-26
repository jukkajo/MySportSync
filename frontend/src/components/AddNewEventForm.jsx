import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

import UniversalTextInput from "./UniversalTextInput";
import ShowToast from "./ShowToast";
import api from "../apis/api.js";
import logo from "../assets/logo.png";
import SportTypeSelect from "./SportTypeSelect";

const AddNewEventForm = () => {
  const [availableSports, setAvailableSports] = useState([]); 
  
  const [sport, setSport] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [opponentTeam, setOpponentTeam] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sport,
      homeTeam,
      opponentTeam,
      date,
      time,
      venue,
      description,
    };
    
    try {
      const response = await api.post("/api/events/save-event", payload);
      if (response.status === 200) { 
        showToast({
          image: logo,
          title: "Success!",
          subtitle: "Event saved."
        });
        // Clear form fields
        setSport("");
        setHomeTeam("");
        setOpponentTeam("");
        setDate("");
        setTime("");
        setVenue("");
        setDescription("");
      } else {
        showToast({
          image: logo,
          title: "Failed to save event.",
          subtitle: "Server-error occurred."
        });
      }      
    } catch (errot) {
    
    }
  };
  
  const handleSportTypeSelect = (sportType) => {
    setSport(sportType);
  };

  return (
    <motion.div
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8"
    >
      <div className="flex justify-center items-center space-x-2">
       <h1 className="text-3xl text-white font-bold mb-2 text-center">Add Event</h1>
       <CalendarPlus className="w-7 h-7 mb-3 text-white" />
      </div>
      
     <div className="flex flex-col border border-gray-200 text-lg font-semibold text-black rounded-xl bg-white py-6 px-8 max-w-xl mx-auto space-y-2">
     
      <SportTypeSelect selectedSport={sport} sports={availableSports} onSelect={handleSportTypeSelect} />

      <UniversalTextInput
        label="Home Team"
        value={homeTeam}
        onChange={setHomeTeam}
        maxLength={40}
        placeholder="Name of team"
      />

      <UniversalTextInput
        label="Opponent Team"
        value={opponentTeam}
        onChange={setOpponentTeam}
        maxLength={40}
        placeholder="Name of team"
      />

      <div className="flex w-full gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1 w-25">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
            required
          />
        </div>
      </div>

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

      <motion.button
        transition={{ duration: 0.2 }}
        type="submit"
        className={`${availableSports.length < 1 ? "cursor-not-allowed bg-gray-300" : "bg-green-600 hover:bg-green-400 cursor-pointer" } mt-4 py-2  text-white font-bold rounded-lg`}
        disabled={availableSports.length < 1}
      >
        Add Event
      </motion.button>
    </div>
    </motion.div>
  );
};

export default AddNewEventForm;

