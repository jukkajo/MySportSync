INSERT INTO teams (sport_id, team_name) VALUES
((SELECT id FROM sports WHERE name='football'), 'Salzburg'),
((SELECT id FROM sports WHERE name='football'), 'Sturm'),
((SELECT id FROM sports WHERE name='ice hockey'), 'KAC'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Capitals');
