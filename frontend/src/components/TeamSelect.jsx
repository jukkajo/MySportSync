import React, { useState, useEffect } from "react";
import api from "../apis/api.js";

const TeamSelect = ({ label, selectedTeam, onSelect }) => {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      if (query.length < 1) return; // Search only when atleast one chars typed
      const response = await api.get("/teams/get-teams", { params: { search: query } });
      console.log("RSP", response.data);
      setTeams(response.data || []);
    };
    const delay = setTimeout(fetchTeams, 400); // input debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="flex flex-col relative">
      <label className="text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="p-2 rounded-lg border border-gray-300"
        placeholder="Type team name..."
      />
      {isOpen && teams.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-21 z-10 w-full max-h-40 overflow-y-auto shadow-lg">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => {
                onSelect(team.id);
                setQuery(team.team_name);
                setIsOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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

