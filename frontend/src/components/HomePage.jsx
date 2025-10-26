import React from "react";
import HomePageHeader from "./HomePageHeader";
import AddNewEventFrom from "./AddNewEventForm";
import EventDisplay from "./EventDisplay";
import HomePageFooter from "./HomePageFooter";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary"
         style={{
           backgroundImage: "url('/src/assets/wallpaper.png')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
          }}
    >
      {/* Header */}
      <HomePageHeader />

      {/* Center area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <div className="flex items-center justify-center space-x-15 w-full h-full">
          <EventDisplay events={[]} />
          <AddNewEventFrom />
        </div>
      </div>

      {/* Footer */}
      <HomePageFooter />
    </div>
  );
};

export default HomePage;

