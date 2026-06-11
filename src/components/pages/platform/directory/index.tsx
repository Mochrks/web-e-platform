'use client';

import { useDirectoryPage } from './DirectoryPageHook';
import DirectoryPageUI from './DirectoryPageUI';

export default function DirectoryPage() {
  const pageProps = useDirectoryPage();
  return <DirectoryPageUI {...pageProps} />;
}
