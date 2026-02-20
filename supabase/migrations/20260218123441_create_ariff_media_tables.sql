/*
  # Ariff Media Database Schema

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text) - News headline
      - `description` (text) - News description
      - `image_url` (text) - News image URL
      - `category` (text) - News category
      - `is_headline` (boolean) - Whether it's a headline news
      - `created_at` (timestamptz) - Creation timestamp
      
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text) - Movie title
      - `rank` (integer) - Movie ranking (1-5)
      - `youtube_url` (text) - YouTube embed URL
      - `thumbnail_url` (text) - Movie thumbnail
      - `description` (text) - Movie description
      - `created_at` (timestamptz)
      
    - `cinema_schedules`
      - `id` (uuid, primary key)
      - `cinema_name` (text) - Either 'Alem Cinema' or 'National Theater'
      - `movie_title` (text) - Movie being shown
      - `show_time` (text) - Show time
      - `day_of_week` (text) - Day of the week
      - `created_at` (timestamptz)
      
    - `sports_matches`
      - `id` (uuid, primary key)
      - `home_team` (text) - Home team name
      - `away_team` (text) - Away team name
      - `home_score` (integer) - Home team score
      - `away_score` (integer) - Away team score
      - `match_status` (text) - live, finished, scheduled
      - `match_time` (text) - Match time or status
      - `created_at` (timestamptz)
      
    - `advertisements`
      - `id` (uuid, primary key)
      - `title` (text) - Ad title
      - `image_url` (text) - Ad image URL
      - `link_url` (text) - Ad link URL
      - `is_active` (boolean) - Whether ad is active
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (media site is public)
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  category text DEFAULT 'general',
  is_headline boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  rank integer NOT NULL,
  youtube_url text NOT NULL,
  thumbnail_url text,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cinema_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cinema_name text NOT NULL,
  movie_title text NOT NULL,
  show_time text NOT NULL,
  day_of_week text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sports_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  home_score integer DEFAULT 0,
  away_score integer DEFAULT 0,
  match_status text DEFAULT 'scheduled',
  match_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS advertisements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  link_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view news"
  ON news FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view movies"
  ON movies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view cinema schedules"
  ON cinema_schedules FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view sports matches"
  ON sports_matches FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view advertisements"
  ON advertisements FOR SELECT
  TO anon, authenticated
  USING (is_active = true);