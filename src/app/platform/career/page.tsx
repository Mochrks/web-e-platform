import CareerPage from '@/components/pages/platform/career';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Path & Goals - E-Platform',
  description: 'Plan your career progression and set your goals.',
};

export default function Page() {
  return <CareerPage />;
}
