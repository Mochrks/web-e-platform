import DirectoryPage from '@/components/pages/platform/directory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Directory - E-Platform',
  description: 'Find colleagues and view the organization chart.',
};

export default function Page() {
  return <DirectoryPage />;
}
