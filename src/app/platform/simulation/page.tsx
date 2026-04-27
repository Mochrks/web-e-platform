import SimulationPage from '@/components/pages/platform/simulation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Interview Simulation - E-Platform',
  description: 'Practice your interview skills with our AI-powered simulator.',
};

export default function Page() {
  return <SimulationPage />;
}
