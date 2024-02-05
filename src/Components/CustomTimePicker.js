import React, { useState, useEffect } from 'react';

const CustomTimePicker = ({ onChange, defaultTime, defaultPM }) => {
  const [hours, setHours] = useState(defaultTime);
  const [minutes, setMinutes] = useState(0);
  const [isPM, setIsPM] = useState(defaultPM);

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value, 10));
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value, 10));
  };

  const handleAMPMChange = () => {
    setIsPM(!isPM);
  };

  useEffect(() => {
    updateSelectedTime();
  }, [hours, minutes, isPM]);

  const updateSelectedTime = () => {
    const formattedHours = isPM ? (hours % 12) + 12 : hours % 12 || 12;
    const formattedMinutes = minutes === 0 ? '00' : '30';
    const selectedTime = `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes}`;
    onChange(selectedTime);
  }

  return (
    <div>
      <select value={hours} onChange={handleHoursChange}>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <span>:</span>
      <select value={minutes} onChange={handleMinutesChange}>
        <option value={0}>00</option>
        <option value={30}>30</option>
      </select>
      <select value={isPM ? 'PM' : 'AM'} onChange={handleAMPMChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default CustomTimePicker;