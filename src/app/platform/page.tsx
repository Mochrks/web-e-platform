import SimulationPage from '@/components/pages/platform/simulation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interview Simulator - E-Platform',
  description: 'Practice your interview skills with AI-powered simulations.',
};

export default function Page() {
  return <SimulationPage />;
}
