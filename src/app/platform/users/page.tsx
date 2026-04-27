import UserManagementPage from '@/components/pages/platform/users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management - E-Platform Admin',
  description: 'Manage platform users and roles.',
};

export default function Page() {
  return <UserManagementPage />;
}
