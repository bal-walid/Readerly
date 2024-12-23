import { useState, useEffect } from 'react';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import ClockIcon from '@mui/icons-material/ScheduleOutlined';

const DateTimeDisplay = () => {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  const formatStrings = () => {
    const date = new Date();
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return {
      time: `${hours}:${minutes}`,
      date: `${day} - ${month} - ${year}`
    };
  };

  useEffect(() => {
    let intervalId;
    const initial = formatStrings();
    setTimeString(initial.time);
    setDateString(initial.date);

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    
    const timeoutId = setTimeout(() => {
      const formatted = formatStrings();
      setTimeString(formatted.time);
      setDateString(formatted.date);
      
      intervalId = setInterval(() => {
        const formatted = formatStrings();
        setTimeString(formatted.time);
        setDateString(formatted.date);
      }, 60000);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="max-[1100px]:text-sm max-[1100px]:px-3 max-[800px]:hidden font-['IBM_Plex_Mono'] flex gap-6 items-center bg-white rounded-full px-6 shadow-btn-shadow">
      <div className="flex items-center gap-3"><ClockIcon className='text-main' fontSize='small'/> {timeString}</div>
      <div className="flex items-center gap-3 uppercase"><CalendarIcon className='text-main' fontSize='small'/> {dateString}</div>
    </div>
  );
};

export default DateTimeDisplay;