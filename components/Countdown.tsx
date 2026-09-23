"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function Countdown({
  targetDate,
}: {
  targetDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(new Date(targetDate)),
  );

  useEffect(() => {
    const date = new Date(targetDate);
    const tick = () => setTimeLeft(getTimeLeft(date));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      {units.map((unit, index) => (
        <div key={unit.label} className="countdown-unit-group">
          <div className="countdown-unit">
            <span className="countdown-value">{pad(unit.value)}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
          {index < units.length - 1 && (
            <span className="countdown-separator">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
