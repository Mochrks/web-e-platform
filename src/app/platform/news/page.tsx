import NewsPage from '@/components/pages/platform/news';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Announcements - E-Platform',
  description:
    'Stay up-to-date with the latest company news and announcements.',
};

export default function Page() {
  return <NewsPage />;
}
