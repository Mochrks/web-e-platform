import LibraryPage from '@/components/pages/platform/library';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Base - E-Platform',
  description: 'Access company documents, SOPs, and training materials.',
};

export default function Page() {
  return <LibraryPage />;
}
