import VerifyEmailPage from '@/components/pages/verify-email';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email - E-Platform Portal',
  description: 'Verify your email address to activate your account.',
};

export default function Page() {
  return <VerifyEmailPage />;
}
