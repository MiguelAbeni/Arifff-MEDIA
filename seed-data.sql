-- Sample data for Ariff Media

-- Sample News
INSERT INTO news (title, description, category, is_headline, image_url) VALUES
('Ethiopian Airlines Wins Best Airline Award', 'Ethiopian Airlines has been recognized as the best airline in Africa for the fifth consecutive year, showcasing excellence in service and safety.', 'Business', true, 'https://images.pexels.com/photos/46148/aircraft-jetliner-landing-cloud-46148.jpeg'),
('New Tech Hub Opens in Addis Ababa', 'A state-of-the-art technology hub has opened its doors in Addis Ababa, promising to boost innovation and entrepreneurship in Ethiopia.', 'Technology', true, 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'),
('Ethiopian Coffee Exports Reach Record High', 'Coffee exports from Ethiopia have reached an all-time high, contributing significantly to the national economy.', 'Economy', true, 'https://images.pexels.com/photos/983297/pexels-photo-983297.jpeg'),
('National Football Team Qualifies for Finals', 'The Ethiopian national football team has secured their place in the continental finals after a decisive victory.', 'Sports', true, 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg'),
('Historic Peace Agreement Signed', 'A historic peace agreement has been signed between neighboring regions, marking a new era of cooperation and development.', 'Politics', true, 'https://images.pexels.com/photos/1178498/pexels-photo-1178498.jpeg'),
('Traditional Festival Attracts Thousands', 'The annual Timket festival has attracted thousands of visitors from around the world, celebrating Ethiopian Orthodox traditions.', 'Culture', true, 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg');

-- Sample Movies (Top 5)
INSERT INTO movies (title, rank, youtube_url, description, thumbnail_url) VALUES
('Difret', 1, 'https://www.youtube.com/watch?v=yzOBAM0S4Qg', 'An inspiring Ethiopian film about a young lawyer who risks everything to save a girl from forced marriage.', 'https://images.pexels.com/photos/7991319/pexels-photo-7991319.jpeg'),
('Teza', 2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A powerful story about an Ethiopian man returning home after years abroad during turbulent times.', 'https://images.pexels.com/photos/7991274/pexels-photo-7991274.jpeg'),
('Lamb', 3, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A touching story about an Ethiopian boy and his sheep preparing for a festival.', 'https://images.pexels.com/photos/7991220/pexels-photo-7991220.jpeg'),
('Aster', 4, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A romantic drama set in modern Addis Ababa exploring love and family bonds.', 'https://images.pexels.com/photos/7991286/pexels-photo-7991286.jpeg'),
('Yemaleda Kokeboch', 5, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A heartwarming series about orphaned children finding hope and love.', 'https://images.pexels.com/photos/7991333/pexels-photo-7991333.jpeg');

-- Sample Cinema Schedules - Alem Cinema
INSERT INTO cinema_schedules (cinema_name, movie_title, show_time, day_of_week) VALUES
('Alem Cinema', 'Difret', '3:00 PM', 'Monday'),
('Alem Cinema', 'Teza', '6:00 PM', 'Monday'),
('Alem Cinema', 'Lamb', '9:00 PM', 'Monday'),
('Alem Cinema', 'Aster', '3:00 PM', 'Tuesday'),
('Alem Cinema', 'Yemaleda Kokeboch', '6:00 PM', 'Tuesday'),
('Alem Cinema', 'Difret', '3:00 PM', 'Wednesday'),
('Alem Cinema', 'Teza', '6:00 PM', 'Thursday'),
('Alem Cinema', 'Lamb', '3:00 PM', 'Friday'),
('Alem Cinema', 'Aster', '6:00 PM', 'Saturday'),
('Alem Cinema', 'Yemaleda Kokeboch', '3:00 PM', 'Sunday');

-- Sample Cinema Schedules - National Theater
INSERT INTO cinema_schedules (cinema_name, movie_title, show_time, day_of_week) VALUES
('National Theater', 'Difret', '2:00 PM', 'Monday'),
('National Theater', 'Teza', '5:00 PM', 'Monday'),
('National Theater', 'Lamb', '8:00 PM', 'Monday'),
('National Theater', 'Aster', '2:00 PM', 'Tuesday'),
('National Theater', 'Yemaleda Kokeboch', '5:00 PM', 'Wednesday'),
('National Theater', 'Difret', '8:00 PM', 'Thursday'),
('National Theater', 'Teza', '2:00 PM', 'Friday'),
('National Theater', 'Lamb', '5:00 PM', 'Saturday'),
('National Theater', 'Aster', '2:00 PM', 'Sunday'),
('National Theater', 'Yemaleda Kokeboch', '5:00 PM', 'Sunday');

-- Sample Sports Matches
INSERT INTO sports_matches (home_team, away_team, home_score, away_score, match_status, match_time) VALUES
('Ethiopia', 'Kenya', 2, 1, 'live', '45+2'''),
('St. George', 'Ethiopian Coffee', 0, 0, 'live', '23'''),
('Jimma Aba Jifar', 'Hawassa City', 3, 2, 'finished', 'FT'),
('Adama City', 'Dire Dawa', 1, 1, 'finished', 'FT'),
('Bahir Dar', 'Sidama Coffee', 0, 0, 'scheduled', 'Tomorrow 3:00 PM'),
('Defence Force', 'Wolkite City', 0, 0, 'scheduled', 'Tomorrow 6:00 PM');

-- Sample Advertisements
INSERT INTO advertisements (title, image_url, link_url, is_active) VALUES
('Welcome to Ariff Media', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', '#', true),
('Ethiopian Tourism', 'https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg', '#', true),
('Coffee Excellence', 'https://images.pexels.com/photos/983297/pexels-photo-983297.jpeg', '#', true);
