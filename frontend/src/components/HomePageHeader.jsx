import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const HomePageHeader = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("home");
  const tabs = [{name: "Home", id: "home"},
  		{name: "All Events", id: "events"},
		{name: "All Teams", id: "teams" },
		{name: "About", id: "about"},
		{name: "Register", id: "register"},
		{name: "Login", id: "login"}];
		
  const handleNavigateClick = (path) => {
    const route = "/" + path;
    navigate(route);
  }
  
  return (
  <motion.header
    initial={{ opacity: 0, y: -50 }}   // Starting offscreen
    animate={{ opacity: 1, y: 0 }} // Fade in effect
    transition={{ duration: 0.6, ease: "easeOut" }} // Transition animation
  >
   <div className="flex items-center justify-between px-8 
                   bg-gradient-to-r from-[#0d1a30cc] via-[#243b55cc] to-[#141e30cc]
                   backdrop-blur-xl border-b border-white/10 shadow-[0_8px_20px_rgba(13,26,48,0.6)]">
        
    <div className="flex pl-4 py-2 items-center justify-center space-x-3">
      <img className="w-18 h-18" alt="Logo" src={logo} />
      <h1 className="text-white font-bold text-3xl">MySportSync</h1>
    </div>
    
    <ul className="flex items-center justify-center space-x-8 mr-8">
    {tabs.map(({name, id}) => (
      <li key={id}
          onClick={() => handleNavigateClick(id)}
          className="cursor-pointer hover:border-white hover:border hover:bg-white/10 rounded-full px-2 text-xl text-white font-semibold py-1">
        {name}
      </li>
    ))}
    </ul>
   </div>
   </motion.header>
  );
}

export default HomePageHeader;
