import React, { useEffect, useState } from 'react';

function DateCalculate({post}) {
 
  const startDate = new Date('2023-10-27T10:00:00'); // Başlangıç tarihi
  const endDate = new Date('2023-10-27T14:00:00');   // Bitiş tarihi

  const [leftDays, setLeftDays] = useState(null);

  useEffect(() => {
    const totalTimeInMilliseconds = endDate - startDate;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const totalTimeInDays = totalTimeInMilliseconds / millisecondsInADay;
  
    if (totalTimeInDays < 1) {
        
      // Kalan süre 1 günden az ise saat cinsinden göster
      const totalTimeInHours = totalTimeInMilliseconds / (1000 * 60 * 60);
      setLeftDays(`${totalTimeInHours} saat`);
    } else {
      // Kalan süre 1 günden fazla ise gün cinsinden göster
      setLeftDays(`${totalTimeInDays} gün`);
    }
  }, []);

  return (
    <div>
      {leftDays}
    </div>
  );
}

export default DateCalculate;
