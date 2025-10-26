-- Table hold teams and their specific
CREATE TABLE teams (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sport_id INTEGER NOT NULL,
  team_name VARCHAR(40) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  --Foreign keys
  CONSTRAINT _sport_id_foreign_key FOREIGN KEY (sport_id)
  REFERENCES sports(id) ON DELETE CASCADE
);

