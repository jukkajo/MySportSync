-- Table for sport types, e.g. 'football'
CREATE TABLE sports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);
