import ProjectsPage from '@/components/pages/platform/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Workspace - E-Platform',
  description: 'Collaborate with your team on active projects.',
};

export default function Page() {
  return <ProjectsPage />;
}
