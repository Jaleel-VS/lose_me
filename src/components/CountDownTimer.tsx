"use client";

import React, { useState, useEffect, useCallback } from 'react';

function CountdownTimer({ endDate, startDate }: { endDate: Date, startDate: Date }) {
  const calculateRemainingTime = useCallback(() => {
    const now = new Date();
    if (now < startDate) {
      return { days: -1, hours: -1, minutes: -1, seconds: -1 };
    } else if (now > endDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      const timeDifference = endDate.getTime() - now.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }
  }, [startDate, endDate]);

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function formatTime(time: number) {
    return time < 10 ? `0${time}` : time;
  }

useEffect(() => {
    const timerInterval = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => { // Cleanup function 
        clearInterval(timerInterval);
    };
}, [calculateRemainingTime]); 

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-row items-center gap-5">
        {remainingTime.days >= 0 ? (
          <>
            <div className="flex justify-center flex-col">
              <div className="text-4xl font-semibold">{remainingTime.days}</div>
              <div className="text-xs font-semibold">days</div>
            </div>
            <div className="flex justify-center flex-col">
              <div className="text-4xl font-semibold">{formatTime(remainingTime.hours)}</div>
              <div className="text-xs font-semibold">hours</div>
            </div>
            <div className="flex justify-center flex-col">
              <div className="text-4xl font-semibold">{formatTime(remainingTime.minutes)}</div>
              <div className="text-xs font-semibold">minutes</div>
            </div>
            <div className="flex justify-center flex-col">
              <div className="text-4xl font-semibold">{formatTime(remainingTime.seconds)}</div>
              <div className="text-xs font-semibold">seconds</div>
            </div>
          </>
        ) : remainingTime.days === -1 ? (
          <div className="text-lg font-semibold text-gray-500">Not started</div>
        ) : (
          <div className="text-lg font-semibold text-gray-500">0d 0h 0m 0s</div>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer; 