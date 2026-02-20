import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Pin } from 'lucide-react';

interface FeaturedPost {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  position: number;
}

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    const { data: featured, error: featuredError } = await supabase
      .from('featured_posts')
      .select('*')
      .eq('post_type', 'news')
      .order('position', { ascending: true })
      .limit(2);

    if (featured && featured.length > 0) {
      const postIds = featured.map(f => f.post_id);
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .in('id', postIds);

      if (newsData) {
        const postsWithPosition = newsData.map(post => {
          const featured_item = featured.find(f => f.post_id === post.id);
          return {
            ...post,
            position: featured_item?.position || 0
          };
        }).sort((a, b) => a.position - b.position);

        setPosts(postsWithPosition as FeaturedPost[]);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-r from-[#4A148C] to-[#D81B60]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Pin className="w-6 h-6 text-white mr-2" />
          <h2 className="text-2xl font-bold text-white">Featured Posts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              <div className="p-6 bg-gray-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Pin className="w-4 h-4 text-[#D81B60]" />
                  <span className="text-xs font-semibold text-[#D81B60] uppercase">Featured</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-3">{post.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase">{post.category}</span>
                  <button className="text-[#D81B60] hover:text-white transition-colors font-semibold text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
