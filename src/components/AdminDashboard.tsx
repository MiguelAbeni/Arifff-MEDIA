import { useState } from 'react';
import { X, Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { uploadFile, postContent } from '../lib/api';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'sports' | 'cinema'>('news');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // News form state
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    image_url: '',
    image_file: null as File | null,
    category: 'general',
    is_headline: false,
  });
  const [newsImagePreview, setNewsImagePreview] = useState<string>('');

  // Sports form state
  const [sportsForm, setSportsForm] = useState({
    home_team: '',
    away_team: '',
    home_score: '0',
    away_score: '0',
    match_status: 'scheduled',
    match_time: '',
  });

  // Cinema form state
  const [cinemaForm, setCinemaForm] = useState({
    title: '',
    rank: '5',
    youtube_url: '',
    thumbnail_url: '',
    thumbnail_file: null as File | null,
    description: '',
  });
  const [cinemaImagePreview, setCinemaImagePreview] = useState<string>('');

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl = newsForm.image_url;
      if (newsForm.image_file) {
        imageUrl = await uploadFile(newsForm.image_file, 'news');
      }

      await postContent('news', {
        title: newsForm.title,
        description: newsForm.description,
        image_url: imageUrl,
        category: newsForm.category,
        is_headline: newsForm.is_headline,
      });

      setMessage({ type: 'success', text: 'News published successfully!' });
      setNewsForm({
        title: '',
        description: '',
        image_url: '',
        image_file: null,
        category: 'general',
        is_headline: false,
      });
      setNewsImagePreview('');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error instanceof Error ? error.message : 'Upload failed'}` });
    }

    setLoading(false);
  };

  const handleSportsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await postContent('sports', {
        home_team: sportsForm.home_team,
        away_team: sportsForm.away_team,
        home_score: sportsForm.home_score,
        away_score: sportsForm.away_score,
        match_status: sportsForm.match_status,
        match_time: sportsForm.match_time,
      });

      setMessage({ type: 'success', text: 'Match added successfully!' });
      setSportsForm({
        home_team: '',
        away_team: '',
        home_score: '0',
        away_score: '0',
        match_status: 'scheduled',
        match_time: '',
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error instanceof Error ? error.message : 'Failed to add match'}` });
    }

    setLoading(false);
  };

  const handleCinemaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let thumbnailUrl = cinemaForm.thumbnail_url;
      if (cinemaForm.thumbnail_file) {
        thumbnailUrl = await uploadFile(cinemaForm.thumbnail_file, 'cinema');
      }

      await postContent('cinema', {
        title: cinemaForm.title,
        rank: cinemaForm.rank,
        youtube_url: cinemaForm.youtube_url,
        thumbnail_url: thumbnailUrl,
        description: cinemaForm.description,
      });

      setMessage({ type: 'success', text: 'Movie added successfully!' });
      setCinemaForm({
        title: '',
        rank: '5',
        youtube_url: '',
        thumbnail_url: '',
        thumbnail_file: null,
        description: '',
      });
      setCinemaImagePreview('');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error instanceof Error ? error.message : 'Failed to add movie'}` });
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-[#4A148C] to-[#D81B60] px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {message && (
          <div className={`m-4 p-3 rounded-lg flex items-center space-x-2 ${
            message.type === 'success'
              ? 'bg-green-900 text-green-100'
              : 'bg-red-900 text-red-100'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex border-b border-gray-700">
          {(['news', 'sports', 'cinema'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-[#D81B60] text-white border-b-2 border-[#D81B60]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'news' && (
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, title: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="News headline"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  required
                  value={newsForm.description}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, description: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors h-24 resize-none"
                  placeholder="News content"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewsForm({ ...newsForm, image_file: file });
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewsImagePreview(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                />
                {newsImagePreview && (
                  <img
                    src={newsImagePreview}
                    alt="Preview"
                    className="mt-2 h-24 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Or Image URL</label>
                <input
                  type="url"
                  value={newsForm.image_url}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, image_url: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, category: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  >
                    <option>general</option>
                    <option>politics</option>
                    <option>business</option>
                    <option>technology</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsForm.is_headline}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, is_headline: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span>Featured Headline</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D81B60] to-[#4A148C] text-white font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                <span>{loading ? 'Publishing...' : 'Publish News'}</span>
              </button>
            </form>
          )}

          {activeTab === 'sports' && (
            <form onSubmit={handleSportsSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Home Team</label>
                  <input
                    type="text"
                    required
                    value={sportsForm.home_team}
                    onChange={(e) =>
                      setSportsForm({ ...sportsForm, home_team: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                    placeholder="Team name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Away Team</label>
                  <input
                    type="text"
                    required
                    value={sportsForm.away_team}
                    onChange={(e) =>
                      setSportsForm({ ...sportsForm, away_team: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                    placeholder="Team name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Home Score</label>
                  <input
                    type="number"
                    min="0"
                    value={sportsForm.home_score}
                    onChange={(e) =>
                      setSportsForm({ ...sportsForm, home_score: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Away Score</label>
                  <input
                    type="number"
                    min="0"
                    value={sportsForm.away_score}
                    onChange={(e) =>
                      setSportsForm({ ...sportsForm, away_score: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Match Status</label>
                <select
                  value={sportsForm.match_status}
                  onChange={(e) =>
                    setSportsForm({ ...sportsForm, match_status: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live</option>
                  <option value="finished">Finished</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Match Time</label>
                <input
                  type="text"
                  required
                  value={sportsForm.match_time}
                  onChange={(e) =>
                    setSportsForm({ ...sportsForm, match_time: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="e.g., 3:00 PM ET or 45'"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D81B60] to-[#4A148C] text-white font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                <span>{loading ? 'Updating...' : 'Add Match'}</span>
              </button>
            </form>
          )}

          {activeTab === 'cinema' && (
            <form onSubmit={handleCinemaSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Movie Title</label>
                <input
                  type="text"
                  required
                  value={cinemaForm.title}
                  onChange={(e) =>
                    setCinemaForm({ ...cinemaForm, title: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="Movie name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Rank (1-5)</label>
                <select
                  value={cinemaForm.rank}
                  onChange={(e) =>
                    setCinemaForm({ ...cinemaForm, rank: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">YouTube URL</label>
                <input
                  type="url"
                  required
                  value={cinemaForm.youtube_url}
                  onChange={(e) =>
                    setCinemaForm({ ...cinemaForm, youtube_url: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Upload Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCinemaForm({ ...cinemaForm, thumbnail_file: file });
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setCinemaImagePreview(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                />
                {cinemaImagePreview && (
                  <img
                    src={cinemaImagePreview}
                    alt="Preview"
                    className="mt-2 h-24 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Or Thumbnail URL</label>
                <input
                  type="url"
                  value={cinemaForm.thumbnail_url}
                  onChange={(e) =>
                    setCinemaForm({ ...cinemaForm, thumbnail_url: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={cinemaForm.description}
                  onChange={(e) =>
                    setCinemaForm({ ...cinemaForm, description: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-[#D81B60] outline-none transition-colors h-16 resize-none"
                  placeholder="Movie description"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D81B60] to-[#4A148C] text-white font-bold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                <span>{loading ? 'Adding...' : 'Add Movie'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
