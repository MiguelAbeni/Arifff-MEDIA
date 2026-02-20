import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function DateTimeBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getEthiopianDate = (date: Date) => {
    const gregYear = date.getFullYear();
    const gregMonth = date.getMonth() + 1;
    const gregDay = date.getDate();

    let ethYear = gregYear - 8;
    let ethMonth = gregMonth + 4;
    let ethDay = gregDay + 1;

    if (gregMonth < 9 && gregDay < 11) {
      ethYear -= 1;
    }

    if (ethMonth > 13) {
      ethMonth -= 13;
      ethYear += 1;
    }

    if (ethDay > 30) {
      ethDay -= 30;
      ethMonth += 1;
    }

    const ethMonthNames = [
      'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
      'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'
    ];

    return `${ethMonthNames[ethMonth - 1]} ${ethDay}, ${ethYear}`;
  };

  const getGregorianDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#4A148C] to-[#D81B60] py-4 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-3 text-white">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-semibold">{getTime(currentTime)}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                <span className="text-yellow-300">E.C:</span> {getEthiopianDate(currentTime)}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                <span className="text-yellow-300">G.C:</span> {getGregorianDate(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
