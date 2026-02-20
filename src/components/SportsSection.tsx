import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SportsMatch } from '../types';
import { Trophy, Circle } from 'lucide-react';

export default function SportsSection() {
  const [matches, setMatches] = useState<SportsMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sports_matches')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);

    if (!error && data) {
      setMatches(data);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-red-500';
      case 'finished':
        return 'text-gray-400';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center space-x-1">
            <Circle className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-red-500 font-bold text-sm">LIVE</span>
          </div>
        );
      case 'finished':
        return <span className="text-gray-400 text-sm font-semibold">FT</span>;
      default:
        return <span className="text-yellow-500 text-sm font-semibold">Scheduled</span>;
    }
  };

  if (loading) {
    return (
      <section id="sport" className="py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <p>Loading matches...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sport" className="py-12 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-8 h-8 text-[#D81B60] mr-3" />
          <h2 className="text-4xl font-bold text-white">አሪፍ ስፖርት - Live Scores</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700 hover:border-[#D81B60] transition-all duration-300 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-medium ${getStatusColor(match.match_status)}`}>
                  {match.match_time}
                </span>
                {getStatusBadge(match.match_status)}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D81B60] to-[#4A148C] rounded-full flex items-center justify-center text-white font-bold">
                      {match.home_team.charAt(0)}
                    </div>
                    <span className="text-white font-semibold text-lg flex-1">
                      {match.home_team}
                    </span>
                  </div>
                  <span className="text-3xl font-bold text-white mx-4">
                    {match.home_score}
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4A148C] to-[#D81B60] rounded-full flex items-center justify-center text-white font-bold">
                      {match.away_team.charAt(0)}
                    </div>
                    <span className="text-white font-semibold text-lg flex-1">
                      {match.away_team}
                    </span>
                  </div>
                  <span className="text-3xl font-bold text-white mx-4">
                    {match.away_score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No matches scheduled at the moment.</p>
            <p className="text-sm mt-2">Check back later for live scores!</p>
          </div>
        )}
      </div>
    </section>
  );
}
