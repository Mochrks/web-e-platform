'use client';

import { useTimesheetsPage } from './TimesheetsPageHook';
import TimesheetsPageUI from './TimesheetsPageUI';

export default function TimesheetsPage() {
  const pageProps = useTimesheetsPage();
  return <TimesheetsPageUI {...pageProps} />;
}
