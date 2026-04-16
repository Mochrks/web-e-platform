import MeetingsPage from '@/components/pages/platform/meetings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Meetings - E-Platform',
  description: 'Connect with mentors and peers for mock video interviews.',
};

export default function Page() {
  return <MeetingsPage />;
}
