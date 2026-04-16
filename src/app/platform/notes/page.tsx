import NotesPage from '@/components/pages/platform/notes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Notes - E-Platform',
  description: 'Manage your interview preparation notes and mentor feedback.',
};

export default function Page() {
  return <NotesPage />;
}
