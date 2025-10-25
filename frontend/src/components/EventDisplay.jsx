import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { deriveTimeAndDate } from "../utils/timeUtils";
import logo from "../assets/logo.png";
import { TrendingUp } from "lucide-react";

// Expects array like:
/*
[
  {
    "event_time": "2025-07-18T18:30:00Z",
    "sport": "Football",
    "homeTeam": "Salzburg",
    "opponentTeam": "Sturm"
  },
]
*/

const EventDisplay = ( { events = [] } ) => {

  return (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex flex-col ">
    <div className="flex py-2 mb-2 items-center justify-start space-x-3">
      <img className="w-12 h-12" alt="Logo" src={logo} />
      <h2 className="text-white font-bold text-4xl">Sport Events Calender</h2>
    </div>
    
    <div className="flex py-2 mb-2 items-center justify-start space-x-3">
      <p className="text-gray-300 font-semibold text-2xl">Upcoming Events</p>
      <TrendingUp className="text-green-400 w-9 h-9" />
    </div>
    
    {/* Events header */}
      <div className="grid text-gray-100 grid-cols-5 gap-4 px-4 py-2 border-b border-white/20 font-semibold text-lg">
        <span>Date</span>
        <span>Time</span>
        <span>Sport</span>
        <span>Home</span>
        <span>Opponent</span>
      </div>
      
      {/* Events list */}
      {events.length > 0 ? (
        events.map((event, index) => {
          const { date, time } = deriveTimeAndDate(event.event_time);
          return (
            <div
              key={index}
              className="text-white cursor-pointer bg-secondary grid grid-cols-5 mt-1 gap-4 px-4 py-3 hover:bg-white/20 transition-all duration-200 rounded-lg"
            >
              <span>{date}</span>
              <span>{time}</span>
              <span>{event.sport}</span>
              <span>{event.homeTeam}</span>
              <span>{event.opponentTeam}</span>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-400 py-6">
          No upcoming events yet.
        </p>
      )}
    </div>
  </motion.div>
  );
}

export default EventDisplay;
