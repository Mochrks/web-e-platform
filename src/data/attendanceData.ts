export interface AttendanceLog {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'Present' | 'Late' | 'Absent';
  location: string;
}

export const initialAttendanceLogs: AttendanceLog[] = [
  {
    id: 1,
    date: 'Oct 24, 2025',
    clockIn: '08:55 AM',
    clockOut: '05:05 PM',
    status: 'Present',
    location: 'Home Office',
  },
  {
    id: 2,
    date: 'Oct 23, 2025',
    clockIn: '09:15 AM',
    clockOut: '05:30 PM',
    status: 'Late',
    location: 'Home Office',
  },
  {
    id: 3,
    date: 'Oct 22, 2025',
    clockIn: '08:45 AM',
    clockOut: '05:00 PM',
    status: 'Present',
    location: 'Coworking Space',
  },
  {
    id: 4,
    date: 'Oct 21, 2025',
    clockIn: '09:00 AM',
    clockOut: '06:00 PM',
    status: 'Present',
    location: 'Main Office',
  },
];
