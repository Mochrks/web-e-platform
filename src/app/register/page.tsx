import RegisterPage from '@/components/pages/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - E-Platform Portal',
  description: 'Create your account to access E-Platform training tools.',
};

export default function Page() {
  return <RegisterPage />;
}
