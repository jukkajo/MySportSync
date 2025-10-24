import React, { useState, useEffect } from "react";
import HomePageHeader from "./HomePageHeader";
import AddNewEventFrom from "./AddNewEventForm";
import EventDisplay from "./EventDisplay";
import HomePageFooter from "./HomePageFooter";

const HomePage = () => {

  return (
    <div className="h-screen bg-[#0D1A30] flex-col">
      {/* Header */}
      <HomePageHeader />
      
      {/* Center Area */}
      <div className="flex space-x-4">
        <EventDisplay />
        <AddNewEventFrom />
      </div>
   
      {/* Footer */}
      <HomePageFooter />
    </div>
  );
}

export default HomePage;
