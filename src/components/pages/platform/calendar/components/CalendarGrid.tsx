'use client';

import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';

interface Session {
  id: number;
  title: string;
  time: string;
  mentor: string;
  type: string;
  location: string;
  date: Date;
}

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  sessions: Session[];
  onDateClick: (day: Date) => void;
}

export default function CalendarGrid({
  currentMonth,
  selectedDate,
  sessions,
  onDateClick,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const renderDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4"
        >
          {weekDays[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-4">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const daySessions = sessions.filter((s) => isSameDay(s.date, cloneDay));

        days.push(
          <div
            key={day.toString()}
            className={`
              h-32 md:h-40 p-4 border border-border/50 transition-all cursor-pointer relative group flex flex-col justify-between
              ${!isCurrentMonth ? 'bg-muted/20 opacity-20' : 'bg-card hover:bg-muted/30'}
              ${isSelected ? 'bg-primary/5 border-primary/50 relative z-10 shadow-inner' : ''}
            `}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start">
              <span
                className={`text-xl font-black ${isSelected ? 'text-primary' : 'text-foreground'}`}
              >
                {format(day, 'd')}
              </span>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              {daySessions.slice(0, 2).map((s, idx) => (
                <div
                  key={idx}
                  className="bg-primary/10 text-primary text-[9px] font-black px-2 py-1 rounded-md line-clamp-1 border border-primary/20"
                >
                  {s.title}
                </div>
              ))}
              {daySessions.length > 2 && (
                <div className="text-[9px] font-black text-muted-foreground px-2">
                  + {daySessions.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className="rounded-[2.5rem] overflow-hidden border border-border shadow-sm">
        {rows}
      </div>
    );
  };

  return (
    <div className="bg-card/50 p-2 rounded-[3rem] border border-border">
      {renderDays()}
      {renderCells()}
    </div>
  );
}
