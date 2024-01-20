import React, { useState, useEffect } from 'react';

const CustomTimePicker = ({ onChange }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [isPM, setIsPM] = useState(false);

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
    const selectedTime = `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;

    // Convert to 24-hour format
    const hours24 = isPM ? formattedHours + 12 : formattedHours % 12;
    const selectedTime24 = `${hours24.toString().padStart(2, '0')}:${formattedMinutes}`;
    onChange(selectedTime24);
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