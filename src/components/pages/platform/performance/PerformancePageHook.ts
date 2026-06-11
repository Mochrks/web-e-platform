import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_KPIS = [
  {
    id: 1,
    name: 'Code Quality',
    score: 4.8,
    max: 5,
    target: 4.5,
    trend: '+0.2',
  },
  {
    id: 2,
    name: 'Sprint Velocity',
    score: 4.2,
    max: 5,
    target: 4.0,
    trend: '+0.5',
  },
  {
    id: 3,
    name: 'Peer Collaboration',
    score: 4.9,
    max: 5,
    target: 4.5,
    trend: '+0.1',
  },
];

export const DUMMY_GOALS = [
  {
    id: 1,
    title: 'Migrate to Next.js 14',
    progress: 80,
    deadline: 'Q4 2026',
    status: 'On Track',
  },
  {
    id: 2,
    title: 'Reduce bundle size by 20%',
    progress: 45,
    deadline: 'Q4 2026',
    status: 'At Risk',
  },
  {
    id: 3,
    title: 'Mentorship Program',
    progress: 100,
    deadline: 'Q3 2026',
    status: 'Completed',
  },
];

export const DUMMY_REVIEW_HISTORY = [
  {
    id: 1,
    period: 'Q2 2026',
    rating: 'Exceeds Expectations',
    score: '4.7/5.0',
    manager: 'Sarah Connor',
    notes: 'Outstanding performance leading the frontend migration.',
  },
  {
    id: 2,
    period: 'Q1 2026',
    rating: 'Meets Expectations',
    score: '4.2/5.0',
    manager: 'Sarah Connor',
    notes:
      'Solid delivery on Q1 goals, need to focus more on code review quality.',
  },
  {
    id: 3,
    period: 'Q4 2025',
    rating: 'Exceeds Expectations',
    score: '4.6/5.0',
    manager: 'Sarah Connor',
    notes: 'Successfully launched the new billing platform ahead of schedule.',
  },
];

export function usePerformancePage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState(DUMMY_GOALS);

  const handleAddGoal = (goal: Omit<(typeof DUMMY_GOALS)[0], 'id'>) => {
    setGoals([
      ...goals,
      { ...goal, id: Math.max(...goals.map((g) => g.id), 0) + 1 },
    ]);
  };

  const handleEditGoal = (
    id: number,
    updated: Partial<(typeof DUMMY_GOALS)[0]>
  ) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, ...updated } : g)));
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return {
    isAdmin,
    activeTab,
    setActiveTab,
    kpis: DUMMY_KPIS,
    goals,
    handleAddGoal,
    handleEditGoal,
    handleDeleteGoal,
    reviewHistory: DUMMY_REVIEW_HISTORY,
  };
}
