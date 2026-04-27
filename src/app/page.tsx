import LoginPage from '@/components/pages/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - E-Platform Portal',
  description:
    'Sign in to access the E-Platform elite interview simulation platform.',
};

export default function Page() {
  return <LoginPage />;
}
