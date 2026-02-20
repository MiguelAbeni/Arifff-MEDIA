import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'አሪፍ ቤት', section: 'home' },
    { label: 'አሪፍ መረጃ', section: 'news' },
    { label: 'አሪፍ መዝናኛ', section: 'entertainment' },
    { label: 'አሪፍ ስፖርት', section: 'sport' },
    { label: 'አሪፍ ሲኒማ', section: 'cinema' },
  ];

  const handleClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#4A148C] via-[#6A1B9A] to-[#D81B60] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/ARIFFF-removebg-preview_(1).png"
              alt="Ariff Media"
              className="h-20 w-auto filter drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(216, 27, 96, 0.6))',
                imageRendering: 'crisp-edges'
              }}
            />
          </div>

          <div className="flex-1 flex items-center justify-end space-x-8">
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleClick(link.section)}
                  className="text-white hover:text-gray-200 transition-colors duration-200 font-medium text-lg"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#4A148C] border-t border-[#D81B60]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleClick(link.section)}
                className="block w-full text-left px-3 py-2 text-white hover:bg-[#6A1B9A] rounded-md transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
