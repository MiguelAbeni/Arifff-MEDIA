import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Movie } from '../types';
import { Film, Eye } from 'lucide-react';

export default function CinemaTop5() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
    const interval = setInterval(fetchMovies, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('view_count', { ascending: false })
      .order('rank', { ascending: true })
      .limit(5);

    if (!error && data) {
      setMovies(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <p>Loading top movies...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Film className="w-8 h-8 text-[#D81B60] mr-3" />
          <h2 className="text-4xl font-bold text-white">አሪፍ ሲኒማ TOP 5</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative aspect-[2/3] bg-gray-800 overflow-hidden">
                {movie.thumbnail_url ? (
                  <img
                    src={movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <Film className="w-12 h-12 text-gray-600" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
                  {movie.description && (
                    <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-[#D81B60] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
                  #{index + 1}
                </div>
              </div>

              <div className="bg-gray-800 p-4 border-t border-gray-700">
                <h3 className="text-white font-semibold truncate mb-2">{movie.title}</h3>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Eye className="w-4 h-4 text-[#D81B60]" />
                  <span>{movie.view_count?.toLocaleString() || '0'} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {movies.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">No movies available yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
