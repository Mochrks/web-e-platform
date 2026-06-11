import SupportPage from '@/components/pages/platform/support';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Helpdesk & Support - E-Platform',
  description: 'Request IT support or submit HR queries.',
};

export default function Page() {
  return <SupportPage />;
}
