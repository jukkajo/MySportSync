INSERT INTO events (
  home_team_id, 
  opponent_team_id, 
  event_start, 
  planned_duration,
  event_place,
  description
) VALUES
-- Live matches
((SELECT id FROM teams WHERE team_name = 'FC Red Bull Salzburg'),
 (SELECT id FROM teams WHERE team_name = 'Sturm Graz'),
  NOW() - INTERVAL '30 minutes',
  '90 minutes',
  'Ernst-Happel-Stadion',
  'Salzburg and Sturm meet at Ernst-Happel-Stadion with high intensity from the opening whistle.'
),
((SELECT id FROM teams WHERE team_name = 'Red Bull Salzburg'), -- Hockey team
  (SELECT id FROM teams WHERE team_name = 'Vienna Capitals'),
  NOW() - INTERVAL '15 minutes',
  '120 minutes',
  'Albert Schultz Eishalle',
  'A tight showdown with both teams relying on strong defensive structure and quick transitions.'
),
-- Upcoming ones
((SELECT id FROM teams WHERE team_name = 'LASK'),
  (SELECT id FROM teams WHERE team_name = 'Wolfsberger AC'),
  NOW() + INTERVAL '2 hours',
  '90 minutes',
  'Raiffeisen Arena Linz',
  'LASK hosts WAC in a match where both sides look to gain important points in the pursuit for the championship group.'
),
((SELECT id FROM teams WHERE team_name = 'EC-KAC'),
  (SELECT id FROM teams WHERE team_name = 'Black Wings Linz'),
  NOW() + INTERVAL '1 day',
  '120 minutes',
  'Klagenfurt Stadthalle',
  'Rivalry game between KAC and the Black Wings, always intense, with a packed crowd expected.'
);

