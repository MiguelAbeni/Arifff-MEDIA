import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Advertisement } from '../types';

export default function HeroSection() {
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  useEffect(() => {
    if (ads.length > 0) {
      setCurrentAd(ads[currentIndex]);
    }
  }, [currentIndex, ads]);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('advertisements')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAds(data);
      if (data.length > 0) {
        setCurrentAd(data[0]);
      }
    }
  };

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(216, 27, 96, 0.8), 0 0 60px rgba(216, 27, 96, 0.4)',
              border: '4px solid #D81B60',
            }}
          >
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {currentAd ? (
                (() => {
                  const isVideo = currentAd.image_url.match(/\.(mp4|webm|ogg)$/i);
                  const content = isVideo ? (
                    <video
                      src={currentAd.image_url}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentAd.image_url}
                      alt={currentAd.title}
                      className="w-full h-full object-cover"
                    />
                  );

                  return currentAd.link_url ? (
                    <a
                      href={currentAd.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full block"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  );
                })()
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-2xl font-bold">አሪፍ ሚዲያ</p>
                  <p className="text-lg mt-2">Advertisement Space</p>
                </div>
              )}
            </div>
          </div>

          {ads.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#D81B60]'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
