INSERT INTO teams (sport_id, team_name) VALUES
-- Football
((SELECT id FROM sports WHERE name='football'), 'FC Red Bull Salzburg'),
((SELECT id FROM sports WHERE name='football'), 'Sturm Graz'),
((SELECT id FROM sports WHERE name='football'), 'LASK'),
((SELECT id FROM sports WHERE name='football'), 'Wolfsberger AC'),
((SELECT id FROM sports WHERE name='football'), 'SV Ried'),
((SELECT id FROM sports WHERE name='football'), 'TSV Hartberg'),
((SELECT id FROM sports WHERE name='football'), 'Grazer AK'),
((SELECT id FROM sports WHERE name='football'), 'FC Blau-Weiß Linz'),

-- Ice Hockey
((SELECT id FROM sports WHERE name='ice hockey'), 'Red Bull Salzburg'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Vienna Capitals'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Black Wings Linz'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Graz99ers'),
((SELECT id FROM sports WHERE name='ice hockey'), 'EC-KAC'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Villacher SV'),
((SELECT id FROM sports WHERE name='ice hockey'), 'Pioneers Vorarlberg');
