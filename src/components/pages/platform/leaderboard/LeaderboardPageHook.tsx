'use client';

import { useState } from 'react';
import { LeaderboardEntry } from '@/types/platform';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    employeeId: 'emp-101',
    name: 'Moch Reks',
    avatarConfig: { shirtColor: '#7c3aed', mood: 'happy', shirtType: 'hoodie' },
    totalXP: 12540,
    completedTasks: 45,
    certifications: 5,
    trend: 'up',
  },
  {
    rank: 2,
    employeeId: 'emp-105',
    name: 'Elena Rodriguez',
    avatarConfig: {
      shirtColor: '#ec4899',
      mood: 'thinking',
      shirtType: 'basic',
    },
    totalXP: 11200,
    completedTasks: 42,
    certifications: 4,
    trend: 'up',
  },
  {
    rank: 3,
    employeeId: 'emp-108',
    name: 'Marcus Thorne',
    avatarConfig: { shirtColor: '#10b981', mood: 'serious', shirtType: 'suit' },
    totalXP: 9800,
    completedTasks: 38,
    certifications: 3,
    trend: 'down',
  },
  {
    rank: 4,
    employeeId: 'emp-110',
    name: 'Aisha Gupta',
    avatarConfig: { shirtColor: '#3b82f6', mood: 'happy', shirtType: 'vest' },
    totalXP: 8750,
    completedTasks: 35,
    certifications: 3,
    trend: 'neutral',
  },
  {
    rank: 5,
    employeeId: 'emp-115',
    name: 'Kaito Tanaka',
    avatarConfig: {
      shirtColor: '#f59e0b',
      mood: 'thinking',
      shirtType: 'basic',
    },
    totalXP: 7900,
    completedTasks: 30,
    certifications: 2,
    trend: 'up',
  },
  {
    rank: 6,
    employeeId: 'emp-120',
    name: 'Sarah Jenkins',
    avatarConfig: { shirtColor: '#ec4899', mood: 'happy', shirtType: 'hoodie' },
    totalXP: 7200,
    completedTasks: 28,
    certifications: 2,
    trend: 'neutral',
  },
];

export function useLeaderboardHook() {
  const [entries] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);

  return {
    entries,
    topThree: entries.slice(0, 3),
    others: entries.slice(3),
  };
}
