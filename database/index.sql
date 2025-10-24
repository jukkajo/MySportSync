--  =======================
--  Database Initialization
--  =======================

-- Types:
\i /docker-entrypoint-initdb.d/types/types.sql

-- Tables:
\i /docker-entrypoint-initdb.d/tables/teams.sql
\i /docker-entrypoint-initdb.d/tables/events.sql

--Populate for demo:
\i /docker-entrypoint-initdb.d/test/inserts/insert_example_teams.sql
\i /docker-entrypoint-initdb.d/test/inserts/insert_example_events.sql

