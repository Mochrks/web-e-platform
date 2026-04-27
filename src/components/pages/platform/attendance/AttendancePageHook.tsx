'use client';

import { useState } from 'react';
import { initialAttendanceLogs, AttendanceLog } from '@/data/attendanceData';

export const useAttendancePageHook = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [logs, setLogs] = useState<AttendanceLog[]>(initialAttendanceLogs);

  const handleClockAction = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
    } else {
      const newLog: AttendanceLog = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        clockIn: '09:00 AM',
        clockOut: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Present',
        location: 'Remote',
      };
      setLogs([newLog, ...logs]);
      setIsClockedIn(false);
    }
  };

  return {
    isClockedIn,
    logs,
    handleClockAction,
  };
};
