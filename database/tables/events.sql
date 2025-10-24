-- Table to hold information for sport events between 2 opponents
CREATE TABLE events (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  home_team_id INTEGER,
  opponent_team_id INTEGER,
  event_start TIMESTAMP WITH TIME ZONE, -- Used to derive date, weekday and time
  event_place VARCHAR(128), -- Tells where event is held
  event_timezone VARCHAR(64) NOT NULL DEFAULT 'Europe/Vienna',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  
  --Foreign keys
  CONSTRAINT _home_team_foreign_key FOREIGN KEY (home_team_id) REFERENCES teams(id),
  CONSTRAINT _opponent_team_foreign_key FOREIGN KEY (opponent_team_id) REFERENCES teams(id)
);

