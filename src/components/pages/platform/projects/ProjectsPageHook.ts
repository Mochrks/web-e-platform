import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_PROJECTS = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'Acme Corp',
    description: 'Overhaul of main corporate site with new branding.',
    status: 'In Progress',
    progress: 65,
    deadline: 'Nov 15, 2026',
    team: 4,
    priority: 'High',
    overdue: false,
    budget: '$45,000',
  },
  {
    id: 2,
    name: 'Mobile App V2',
    client: 'Globex',
    description: 'Native iOS and Android app rewrite in React Native.',
    status: 'Planning',
    progress: 15,
    deadline: 'Jan 10, 2027',
    team: 6,
    priority: 'Medium',
    overdue: false,
    budget: '$120,000',
  },
  {
    id: 3,
    name: 'Q3 Marketing Campaign',
    client: 'Internal',
    description: 'Digital ad assets and landing pages for Q3 push.',
    status: 'Completed',
    progress: 100,
    deadline: 'Sep 30, 2026',
    team: 3,
    priority: 'High',
    overdue: false,
    budget: '$15,000',
  },
  {
    id: 4,
    name: 'Security Audit',
    client: 'Fintech Inc',
    description: 'Comprehensive pen-testing and vulnerability scan.',
    status: 'In Progress',
    progress: 40,
    deadline: 'Oct 05, 2026',
    team: 2,
    priority: 'Critical',
    overdue: true,
    budget: '$30,000',
  },
];

export function useProjectsPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = DUMMY_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.status === activeFilter;
  });

  const hasOverdue = DUMMY_PROJECTS.some(
    (p) => p.overdue && p.status !== 'Completed'
  );

  return {
    isAdmin,
    activeFilter,
    setActiveFilter,
    viewMode,
    setViewMode,
    filteredProjects,
    hasOverdue,
  };
}
