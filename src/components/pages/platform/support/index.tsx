'use client';

import { useSupportPage } from './SupportPageHook';
import SupportPageUI from './SupportPageUI';

export default function SupportPage() {
  const pageProps = useSupportPage();
  return <SupportPageUI {...pageProps} />;
}
