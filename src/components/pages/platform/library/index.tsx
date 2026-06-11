'use client';

import { useLibraryPage } from './LibraryPageHook';
import LibraryPageUI from './LibraryPageUI';

export default function LibraryPage() {
  const pageProps = useLibraryPage();
  return <LibraryPageUI {...pageProps} />;
}
