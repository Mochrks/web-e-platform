import TasksPage from '@/components/pages/platform/tasks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Tasks - E-Platform',
  description: 'Track your daily coding and behavioral preparation tasks.',
};

export default function Page() {
  return <TasksPage />;
}
