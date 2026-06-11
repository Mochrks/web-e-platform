'use client';

import { useFeedbackPage } from './FeedbackPageHook';
import FeedbackPageUI from './FeedbackPageUI';

export default function FeedbackPage() {
  const pageProps = useFeedbackPage();
  return <FeedbackPageUI {...pageProps} />;
}
