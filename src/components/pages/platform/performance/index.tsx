'use client';

import { usePerformancePage } from './PerformancePageHook';
import PerformancePageUI from './PerformancePageUI';

export default function PerformancePage() {
  const pageProps = usePerformancePage();
  return <PerformancePageUI {...pageProps} />;
}
