import AttendancePage from '@/components/pages/platform/attendance';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance - E-Platform',
  description: 'Track your daily presence and learning consistency.',
};

export default function Page() {
  return <AttendancePage />;
}
