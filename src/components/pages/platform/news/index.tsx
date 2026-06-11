'use client';

import { useNewsPage } from './NewsPageHook';
import NewsPageUI from './NewsPageUI';

export default function NewsPage() {
  const pageProps = useNewsPage();
  return <NewsPageUI {...pageProps} />;
}
