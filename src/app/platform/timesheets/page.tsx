import TimesheetsPage from '@/components/pages/platform/timesheets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timesheets - E-Platform',
  description: 'Log your hours and track time spent on tasks.',
};

export default function Page() {
  return <TimesheetsPage />;
}
