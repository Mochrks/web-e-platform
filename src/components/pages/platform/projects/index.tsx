'use client';

import { useProjectsPage } from './ProjectsPageHook';
import ProjectsPageUI from './ProjectsPageUI';

export default function ProjectsPage() {
  const pageProps = useProjectsPage();
  return <ProjectsPageUI {...pageProps} />;
}
