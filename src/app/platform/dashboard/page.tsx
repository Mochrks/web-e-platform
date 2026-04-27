import DashboardPage from '@/components/pages/platform/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - E-Platform',
  description: 'View your interview progress, skills, and recent activity.',
};

export default function Page() {
  return <DashboardPage />;
}
