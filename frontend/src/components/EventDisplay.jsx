import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deriveTimeAndDate } from "../utils/timeUtils";
import { sortEvents, isLive } from "../utils/eventDisplayUtils";
import logo from "../assets/logo.png";
import { TrendingUp, ChevronUp, ChevronDown, SortAsc } from "lucide-react";
import api from "../apis/api";
import ShowToast from "../components/ShowToast"; 

const EventDisplay = ({ sortedEvents, setSortedEvents }) => {

  const basicSortFeatures = [
    { key: "date-asc-2", label: "Live" },
    { key: "date-asc", label: "Older" },
    { key: "date-desc", label: "Newer" },
    { key: "sportname-asc", label: "Sport Asc." },
    { key: "sportname-desc", label: "Sport Desc." },
  ];

  const [sortOption, setSortOption] = useState("date-asc");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [events, setEvents] = useState([]);
  const dropdownRef = useRef(null);
  const handleToggleDropdown = () => setShowSortOptions((prev) => !prev);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/get-events", {
          params: { limit: 15 },
        });
        
        console.log("RSP", response.data);
        const payload = Array.isArray(response.data) ? response.data : response.data?.data;

	if (Array.isArray(payload)) {
	  setEvents(payload);
	  sortEvents(payload, sortOption, setSortedEvents);
	} else {
          ShowToast({
            image: logo,
            title: "Failed to Fetch Events",
            subtitle: "Server-error",
            options: { toastId: "fetchError" },
          });
        }
      } catch (err) {
          console.log(err);
          ShowToast({
            image: logo,
            title: "Failed to Fetch Events",
            subtitle: "Server-error",
            options: { toastId: "fetchError" },
          });
      }
    };

    fetchEvents();
  }, []); // Fetch initially once
  
  useEffect(() => {
    const handleClickOutsideOfMenu = (event) => {
      // Is menu rendereded and area clicked not dropdown-menu area  
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { 
        setShowSortOptions(false);
      }
    }; 
  
    if (showSortOptions) {
      document.addEventListener("mousedown", handleClickOutsideOfMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideOfMenu);
    }

  }, [showSortOptions]);

  useEffect(() => {
    if (events.length > 0) {
      sortEvents(events, sortOption, setSortedEvents);
    }
  }, [events, sortOption]);

  return (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y:0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex p-4 bg-black/70 rounded-lg backdrop-blur flex-col ">
    <div className="flex py-2 mb-2 items-center justify-start space-x-3">
      <img className="w-12 h-12" alt="Logo" src={logo} />
      <h2 className="text-white font-bold text-4xl">Sport Events Calender</h2>
    </div>
    
    <div className="flex py-2 mb-2 items-center justify-between space-x-3">
  
      <div className="flex ml-4">
        <p className="text-gray-300 font-semibold text-2xl">Live & Upcoming Events</p>
        <TrendingUp className="pb-1 ml-2 text-green-400 w-9 h-9" />
      </div>
      
      <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-white transition"
      >
        <SortAsc className="w-5 h-5" />
        <span>Sort</span>
        {showSortOptions ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
 
      {/* Sort options menu: basic sort features */}
      <AnimatePresence>
        {showSortOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-10 bg-primary border border-gray-700 rounded-lg shadow-lg p-2 w-56 z-50"
        >
        
        {basicSortFeatures.map((option) => (
          <button
            key={option.key}
            onClick={() => {
              setSortOption(option.key);
              setShowSortOptions(false);
            }}
            className={`block cursor-pointer w-full text-left px-3 py-1.5 rounded-md text-gray-200 hover:bg-secondary ${
              sortOption === option.key ? "bg-secondary" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
        
        </motion.div>
        )}
      </AnimatePresence>
      </div>
      
    </div>

    {/* Events header */}
      <div className="grid text-gray-100 grid-cols-[0.75fr_0.4fr_0.9fr_1.4fr_1.3fr_1.3fr_0.5fr] gap-4 px-4 py-2 border-b border-white/20 font-semibold text-lg">
        <span>Date</span>
        <span>Start</span>
        <span>Sport</span>
        <span>Venue</span>
        <span>Home</span>
        <span>Opponent</span>
        <span>Info</span>
      </div>
      
      {/* Events list */}
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event, index) => {
          console.log("EVNT", event);
          const { date, time } = deriveTimeAndDate(event.event_start);
          // Format smaller
          const subStrings = date.split('-');
          const minimalDate = subStrings[2] + '.' + subStrings[1];
          return (
	    <motion.div
	      key={event.event_id}
	      initial={{ opacity: 0, x: -50 }}
	      animate={{ opacity: 1, x: 0 }}
              transition={{
	        type: "tween",
	        ease: "easeOut",
	        duration: 0.6,
	        delay: index * 0.2, // delay to render with staggered effect
	      }}
	      className="text-white cursor-pointer bg-secondary grid grid-cols-[0.5fr_0.5fr_1fr_1.4fr_1.3fr_1.3fr] mt-1 gap-4 px-4 py-3 hover:bg-white/20 transition-all duration-200 rounded-lg overflow-hidden"
	    >

	      <span className="flex items-center">
	        { /* Live-event dot */ }
	        {isLive(event) ? (
	          <motion.span
		    className="mr-2 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"
		    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.1, 1] }}
		    transition={{
		      duration: 3.2,
		      repeat: Infinity,
		      ease: "easeInOut",
		    }}
		    title="Live"
	          />
	        ) : <div className="w-2.5 h-2.5 mr-2" /> }
	        {minimalDate}
	      </span>
  	      <span>{time}</span>
	      <span className="truncate max-w-[8rem]" title={event.sport}>{event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}</span>
	      <span className="truncate max-w-[12rem]" title={event.event_place}>
	        {event.event_place}
	      </span>
	      <span>{event.home_team}</span>
	      <span>{event.opponent_team}</span>
	    </motion.div>
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
