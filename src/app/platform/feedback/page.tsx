import FeedbackPage from '@/components/pages/platform/feedback';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peer Feedback - E-Platform',
  description: 'Give and receive feedback from your peers.',
};

export default function Page() {
  return <FeedbackPage />;
}
