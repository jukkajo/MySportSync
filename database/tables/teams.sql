-- Table hold teams and their specific
CREATE TABLE teams (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sport_type sport_type, -- Ensures insertion of accepted in sport types only 
  team_name varchar UNIQUE DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
