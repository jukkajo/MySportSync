INSERT INTO events (home_team_id, opponent_team_id, event_start, event_place)
VALUES
  -- 2 live matches
  (1, 2, NOW() - INTERVAL '30 minutes', 'Ernst-Happel-Stadion'),
  (3, 4, NOW() - INTERVAL '15 minutes', 'Albert Schultz Eishalle'),

  -- 2 upcoming ones
  (1, 2, NOW() + INTERVAL '2 hours', 'Ernst-Happel-Stadion'),
  (3, 4, NOW() + INTERVAL '1 day', 'Albert Schultz Eishalle');

