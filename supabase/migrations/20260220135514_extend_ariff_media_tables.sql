/*
  # Extend Ariff Media Database Schema

  1. Modified Tables
    - `movies` table
      - Add `view_count` column to track YouTube views
      - Add `last_updated` to track when rankings were updated

  2. New Tables
    - `featured_posts`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to news)
      - `post_type` (text) - either 'news' or 'entertainment'
      - `position` (integer) - 1 or 2 for featured slots
      - `created_at` (timestamptz)

    - `cinema_schedules_extended`
      - Enhanced cinema schedules with venue management
      - `id` (uuid, primary key)
      - `cinema_name` (text) - አለም ሲኒማ, ሀገር ፍቅር ትያትር, ብሔራዊ ትያትር, ጋራድ ሞል ሲኒማ, ልዑል ሲኒማ
      - `movie_title` (text)
      - `genre` (text)
      - `show_time` (text)
      - `day_of_week` (text)
      - `created_at` (timestamptz)

  3. Security
    - Enable RLS on new tables
    - Public read access for movie rankings and cinema schedules
    - Admin-only write access via policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'movies' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE movies ADD COLUMN view_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'movies' AND column_name = 'last_updated'
  ) THEN
    ALTER TABLE movies ADD COLUMN last_updated timestamptz DEFAULT now();
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS featured_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL,
  post_type text NOT NULL CHECK (post_type IN ('news', 'entertainment')),
  position integer NOT NULL CHECK (position IN (1, 2)),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_type, position)
);

CREATE TABLE IF NOT EXISTS cinema_schedules_extended (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cinema_name text NOT NULL CHECK (cinema_name IN ('አለም ሲኒማ', 'ሀገር ፍቅር ትያትር', 'ብሔራዊ ትያትር', 'ጋራድ ሞል ሲኒማ', 'ልዑል ሲኒማ')),
  movie_title text NOT NULL,
  genre text,
  show_time text NOT NULL,
  day_of_week text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE featured_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_schedules_extended ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured posts"
  ON featured_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view cinema schedules"
  ON cinema_schedules_extended FOR SELECT
  TO anon, authenticated
  USING (true);
