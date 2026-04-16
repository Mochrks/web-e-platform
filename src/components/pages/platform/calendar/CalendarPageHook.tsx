'use client';

import { useState } from 'react';
import { initialSessions, Session } from '@/data/calendarData';
import { addMonths, subMonths, isSameDay } from 'date-fns';

export const useCalendarPageHook = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    title: '',
    mentor: 'Senior Mentor',
  });
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleBook = () => {
    if (!newBooking.title) return;
    const session: Session = {
      id: Date.now(),
      title: newBooking.title,
      mentor: newBooking.mentor,
      time: 'TBD',
      type: 'Technical',
      location: 'Remote',
      date: selectedDate,
    };
    setSessions([...sessions, session]);
    setIsBookingOpen(false);
    setNewBooking({ title: '', mentor: 'Senior Mentor' });
  };

  const filteredSessions = sessions.filter((s) =>
    isSameDay(s.date, selectedDate)
  );

  return {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    isBookingOpen,
    setIsBookingOpen,
    newBooking,
    setNewBooking,
    sessions,
    nextMonth,
    prevMonth,
    handleBook,
    filteredSessions,
  };
};
