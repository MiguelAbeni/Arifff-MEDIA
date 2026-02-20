export interface News {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  is_headline: boolean;
  created_at: string;
}

export interface Movie {
  id: string;
  title: string;
  rank: number;
  youtube_url: string;
  thumbnail_url?: string;
  description?: string;
  created_at: string;
}

export interface CinemaSchedule {
  id: string;
  cinema_name: string;
  movie_title: string;
  show_time: string;
  day_of_week: string;
  created_at: string;
}

export interface SportsMatch {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  match_status: 'live' | 'finished' | 'scheduled';
  match_time: string;
  created_at: string;
}

export interface Advertisement {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  created_at: string;
}
