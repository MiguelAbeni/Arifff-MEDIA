import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { News } from '../types';
import { TrendingUp } from 'lucide-react';

export default function NewsGrid() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_headline', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="news" className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <p>Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-12 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="w-8 h-8 text-[#D81B60] mr-3" />
          <h2 className="text-4xl font-bold text-white">አሪፍ መረጃ - Headline News</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              {item.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-gradient-to-r from-[#D81B60] to-[#4A148C] rounded-full">
                  {item.category}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#D81B60] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-300 line-clamp-3 text-sm">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.1) 0%, rgba(74, 20, 140, 0.1) 100%)',
                }}
              />
            </div>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No news available at the moment.</p>
            <p className="text-sm mt-2">Check back later for updates!</p>
          </div>
        )}
      </div>
    </section>
  );
}
