import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Movie, CinemaSchedule, Advertisement } from '../types';
import { Film, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function CinemaSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [alemSchedules, setAlemSchedules] = useState<CinemaSchedule[]>([]);
  const [nationalSchedules, setNationalSchedules] = useState<CinemaSchedule[]>([]);
  const [alemExpanded, setAlemExpanded] = useState(false);
  const [nationalExpanded, setNationalExpanded] = useState(false);
  const [adBanner, setAdBanner] = useState<Advertisement | null>(null);

  useEffect(() => {
    fetchMovies();
    fetchSchedules();
    fetchAdBanner();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('rank', { ascending: true })
      .limit(5);

    if (!error && data) {
      setMovies(data);
      if (data.length > 0) {
        setSelectedMovie(data[0]);
      }
    }
    setLoading(false);
  };

  const fetchSchedules = async () => {
    const { data: alemData } = await supabase
      .from('cinema_schedules')
      .select('*')
      .eq('cinema_name', 'Alem Cinema')
      .order('day_of_week', { ascending: true });

    const { data: nationalData } = await supabase
      .from('cinema_schedules')
      .select('*')
      .eq('cinema_name', 'National Theater')
      .order('day_of_week', { ascending: true });

    if (alemData) setAlemSchedules(alemData);
    if (nationalData) setNationalSchedules(nationalData);
  };

  const fetchAdBanner = async () => {
    const { data } = await supabase
      .from('advertisements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setAdBanner(data);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const getEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  if (loading) {
    return (
      <section id="cinema" className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <p>Loading cinema...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cinema" className="py-12 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Film className="w-8 h-8 text-[#D81B60] mr-3" />
          <h2 className="text-4xl font-bold text-white">አሪፍ ሲኒማ - Top 5 Movies</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {selectedMovie && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={getEmbedUrl(selectedMovie.youtube_url)}
                    title={selectedMovie.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {adBanner && (
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">Advertisement</p>
                    {adBanner.link_url ? (
                      <a href={adBanner.link_url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={adBanner.image_url}
                          alt={adBanner.title}
                          className="w-full h-24 object-cover rounded"
                        />
                      </a>
                    ) : (
                      <img
                        src={adBanner.image_url}
                        alt={adBanner.title}
                        className="w-full h-24 object-cover rounded"
                      />
                    )}
                  </div>
                )}

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedMovie.title}</h3>
                  {selectedMovie.description && (
                    <p className="text-gray-300">{selectedMovie.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Top Ranked
            </h3>
            {movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleMovieSelect(movie)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedMovie?.id === movie.id
                    ? 'bg-gradient-to-r from-[#D81B60] to-[#4A148C] shadow-lg scale-105'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D81B60] to-[#4A148C] flex items-center justify-center">
                      <span className="text-white text-xl font-bold">#{movie.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{movie.title}</h4>
                    {movie.thumbnail_url && (
                      <img
                        src={movie.thumbnail_url}
                        alt={movie.title}
                        className="mt-2 w-full h-20 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => setAlemExpanded(!alemExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white">Alem Cinema Schedule</h3>
              {alemExpanded ? (
                <ChevronUp className="w-6 h-6 text-[#D81B60]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#D81B60]" />
              )}
            </button>

            {alemExpanded && (
              <div className="p-6 pt-0 space-y-3">
                {alemSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="bg-gray-900 p-4 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-semibold">{schedule.movie_title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{schedule.day_of_week}</p>
                      </div>
                      <span className="text-[#D81B60] font-bold">{schedule.show_time}</span>
                    </div>
                  </div>
                ))}
                {alemSchedules.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No schedules available</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => setNationalExpanded(!nationalExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white">National Theater Schedule</h3>
              {nationalExpanded ? (
                <ChevronUp className="w-6 h-6 text-[#D81B60]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#D81B60]" />
              )}
            </button>

            {nationalExpanded && (
              <div className="p-6 pt-0 space-y-3">
                {nationalSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="bg-gray-900 p-4 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-semibold">{schedule.movie_title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{schedule.day_of_week}</p>
                      </div>
                      <span className="text-[#D81B60] font-bold">{schedule.show_time}</span>
                    </div>
                  </div>
                ))}
                {nationalSchedules.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No schedules available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
