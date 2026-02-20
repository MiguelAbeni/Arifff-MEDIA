import { useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import DateTimeBar from './components/DateTimeBar';
import NewsGrid from './components/NewsGrid';
import SportsSection from './components/SportsSection';
import CinemaSection from './components/CinemaSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const entertainmentRef = useRef<HTMLDivElement>(null);
  const sportRef = useRef<HTMLDivElement>(null);
  const cinemaRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    let targetRef;

    switch (section) {
      case 'home':
        targetRef = homeRef;
        break;
      case 'news':
        targetRef = newsRef;
        break;
      case 'entertainment':
        targetRef = entertainmentRef;
        break;
      case 'sport':
        targetRef = sportRef;
        break;
      case 'cinema':
        targetRef = cinemaRef;
        break;
      default:
        targetRef = homeRef;
    }

    if (targetRef.current) {
      const navHeight = 64;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation onNavigate={handleNavigate} />

      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-[#D81B60] to-[#4A148C] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        title="Admin Dashboard"
      >
        <Settings size={24} />
      </button>

      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}

      <div ref={homeRef}>
        <HeroSection />
        <DateTimeBar />
      </div>

      <div ref={newsRef}>
        <NewsGrid />
      </div>

      <div ref={entertainmentRef} className="py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">አሪፍ መዝናኛ</h2>
          <p className="text-gray-300">Entertainment content coming soon!</p>
        </div>
      </div>

      <div ref={sportRef}>
        <SportsSection />
      </div>

      <div ref={cinemaRef}>
        <CinemaSection />
      </div>

      <Footer />
    </div>
  );
}

export default App;
