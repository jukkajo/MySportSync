import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

import UniversalTextInput from "./UniversalTextInput";
import api from "../apis/api.js";
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

  const handleSubmit = (e) => {
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
        className="cursor-pointer mt-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Add Event
      </motion.button>
    </div>
    </motion.div>
  );
};

export default AddNewEventForm;

