import MonitoringPage from '@/components/pages/platform/monitoring';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monitoring - E-Platform Admin',
  description: 'Real-time platform performance and activity monitoring.',
};

export default function Page() {
  return <MonitoringPage />;
}
