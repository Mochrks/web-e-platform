'use client';

import { useRewardsPage } from './RewardsPageHook';
import RewardsPageUI from './RewardsPageUI';

export default function RewardsPage() {
  const pageProps = useRewardsPage();
  return <RewardsPageUI {...pageProps} />;
}
