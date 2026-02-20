import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 animated-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/ARIFFF-removebg-preview_(1).png"
              alt="Ariff Media"
              className="h-20 w-auto mb-4 filter drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(216, 27, 96, 0.6))',
                imageRendering: 'crisp-edges'
              }}
            />
            <p className="text-gray-300 text-sm">
              Your premier source for Ethiopian news, entertainment, sports, and cinema.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D81B60]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-[#D81B60] transition-colors">
                  አሪፍ ቤት
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-300 hover:text-[#D81B60] transition-colors">
                  አሪፍ መረጃ
                </a>
              </li>
              <li>
                <a href="#sport" className="text-gray-300 hover:text-[#D81B60] transition-colors">
                  አሪፍ ስፖርት
                </a>
              </li>
              <li>
                <a href="#cinema" className="text-gray-300 hover:text-[#D81B60] transition-colors">
                  አሪፍ ሲኒማ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D81B60]">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#D81B60]" />
                <span className="text-gray-300 text-sm">info@ariffmedia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#D81B60]" />
                <span className="text-gray-300 text-sm">+251 11 XXX XXXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Ariff Media. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D81B60] to-[#4A148C] flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-bg {
          background: linear-gradient(
            45deg,
            #4A148C,
            #D81B60,
            #6A1B9A,
            #4A148C
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>
    </footer>
  );
}
