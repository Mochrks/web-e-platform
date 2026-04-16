import CalendarPage from '@/components/pages/platform/calendar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Schedule - E-Platform',
  description: 'Manage your interview simulation sessions and mentor meetings.',
};

export default function Page() {
  return <CalendarPage />;
}
