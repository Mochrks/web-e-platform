'use client';

import { useCareerPage } from './CareerPageHook';
import CareerPageUI from './CareerPageUI';

export default function CareerPage() {
  const pageProps = useCareerPage();
  return <CareerPageUI {...pageProps} />;
}
