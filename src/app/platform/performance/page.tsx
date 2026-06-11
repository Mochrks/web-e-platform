import PerformancePage from '@/components/pages/platform/performance';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Performance - E-Platform',
  description: 'View your personal analytics and performance dashboard.',
};

export default function Page() {
  return <PerformancePage />;
}
