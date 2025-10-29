import React, { useState, useEffect } from "react";
import api from "../apis/api.js";

const TeamSelect = ({ id, label, selectedTeam, onSelect }) => {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      if (query.length < 1) return; // Search only when atleast one chars typed
      const response = await api.get("/teams/get-teams", { params: { search: query } });
      setTeams(response.data || []);
    };
    const delay = setTimeout(fetchTeams, 400); // input debounce
    return () => clearTimeout(delay);
  }, [query]);
  
  // Autofill selected team back after view change
  useEffect(() => {
    if (!selectedTeam) return;
    setQuery(selectedTeam);
  }, [selectedTeam]);

  // Check if typed value is registered team
  const validateTeam = () => {
    const matchedTeam = teams.find(
      (t) => t.team_name.toLowerCase() === query.toLowerCase()
    );
    if (matchedTeam) {
      // valid
      onSelect(matchedTeam.id, false);
    } else {
      // Not registered
      onSelect(null, true);
    }
  };
  
  return (
    <div className="flex flex-col relative">
      <label className="text-gray-700 text-sm font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="p-2 rounded-lg border border-gray-300"
        placeholder="Type to search..."
      />
      {isOpen && teams.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-21 z-10 w-full max-h-80 overflow-y-auto shadow-lg">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => {
                onSelect(team.id, team.team_name);
                setQuery(team.team_name);
                setIsOpen(false);
              }}
              className="px-3 text-sm py-2 cursor-pointer hover:bg-gray-100"
            >
              {team.team_name}
              <span className="bg-gray-200 text-xs ml-4 px-2 py-1 rounded-full" >{team.sport_name.charAt(0).toUpperCase() + team.sport_name.slice(1)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamSelect;

