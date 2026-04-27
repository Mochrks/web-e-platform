import SettingsPage from '@/components/pages/platform/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - E-Platform',
  description: 'Manage your profile, avatar, and account preferences.',
};

export default function Page() {
  return <SettingsPage />;
}
