import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Film, ChevronDown, ChevronUp } from 'lucide-react';

interface CinemaSchedule {
  id: string;
  cinema_name: string;
  movie_title: string;
  genre: string;
  show_time: string;
  day_of_week: string;
  created_at: string;
}

const CINEMAS = [
  'አለም ሲኒማ',
  'ሀገር ፍቅር ትያትር',
  'ብሔራዊ ትያትር',
  'ጋራድ ሞል ሲኒማ',
  'ልዑል ሲኒማ'
];

export default function CinemaSchedules() {
  const [schedules, setSchedules] = useState<CinemaSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCinema, setExpandedCinema] = useState<string>('አለም ሲኒማ');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from('cinema_schedules_extended')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (!error && data) {
      setSchedules(data);
    }
    setLoading(false);
  };

  const getCinemaSchedules = (cinemaName: string) => {
    return schedules.filter(s => s.cinema_name === cinemaName);
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <p>Loading schedules...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Film className="w-8 h-8 text-[#D81B60] mr-3" />
          <h2 className="text-4xl font-bold text-white">Cinema & Theater Schedules</h2>
        </div>

        <div className="space-y-4">
          {CINEMAS.map((cinema) => {
            const cinemaSchedules = getCinemaSchedules(cinema);
            return (
              <div
                key={cinema}
                className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border border-gray-600 overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setExpandedCinema(expandedCinema === cinema ? '' : cinema)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-white">{cinema}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm">{cinemaSchedules.length} shows</span>
                    {expandedCinema === cinema ? (
                      <ChevronUp className="w-6 h-6 text-[#D81B60]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#D81B60]" />
                    )}
                  </div>
                </button>

                {expandedCinema === cinema && (
                  <div className="p-6 pt-0 space-y-3 max-h-96 overflow-y-auto">
                    {cinemaSchedules.length > 0 ? (
                      cinemaSchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-[#D81B60] transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-gray-400 text-xs uppercase">Movie</p>
                              <h4 className="text-white font-semibold">{schedule.movie_title}</h4>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase">Genre</p>
                              <p className="text-gray-200">{schedule.genre || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase">Day</p>
                              <p className="text-gray-200">{schedule.day_of_week}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase">Time</p>
                              <p className="text-[#D81B60] font-bold text-lg">{schedule.show_time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">No schedules available for this cinema</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
