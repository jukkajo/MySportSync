--  =======================
--  Database Initialization
--  =======================

-- Tables:
\i /docker-entrypoint-initdb.d/tables/sports.sql
\i /docker-entrypoint-initdb.d/tables/teams.sql
\i /docker-entrypoint-initdb.d/tables/events.sql

--Populate for demo:
\i /docker-entrypoint-initdb.d/test/inserts/insert_example_sports.sql
\i /docker-entrypoint-initdb.d/test/inserts/insert_example_teams.sql
\i /docker-entrypoint-initdb.d/test/inserts/insert_example_events.sql

