import RewardsPage from '@/components/pages/platform/rewards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewards & Perks - E-Platform',
  description: 'Redeem your points for company rewards and perks.',
};

export default function Page() {
  return <RewardsPage />;
}
