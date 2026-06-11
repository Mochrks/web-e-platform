import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_REWARDS = [
  { id: 1, title: '$50 Amazon Gift Card', points: 500, category: 'Gift Cards' },
  { id: 2, title: 'Extra Day Off', points: 2000, category: 'Time Off' },
  { id: 3, title: 'Company Swag Pack', points: 300, category: 'Merchandise' },
  { id: 4, title: 'Coffee Shop Voucher', points: 100, category: 'Gift Cards' },
  {
    id: 5,
    title: '1-on-1 Lunch with CEO',
    points: 5000,
    category: 'Experiences',
  },
];

export const TRANSACTIONS = [
  {
    id: 1,
    date: 'Oct 15, 2026',
    desc: 'Received Kudos from Alice',
    points: '+50',
    type: 'earned',
  },
  {
    id: 2,
    date: 'Oct 02, 2026',
    desc: 'Completed Security Training early',
    points: '+100',
    type: 'earned',
  },
  {
    id: 3,
    date: 'Sep 20, 2026',
    desc: 'Redeemed Coffee Voucher',
    points: '-100',
    type: 'spent',
  },
  {
    id: 4,
    date: 'Sep 01, 2026',
    desc: 'Work Anniversary Bonus',
    points: '+500',
    type: 'earned',
  },
];

export function useRewardsPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState('catalog');
  const userPoints = 1250;
  const expiringPoints = 100;

  return {
    isAdmin,
    activeTab,
    setActiveTab,
    userPoints,
    expiringPoints,
    rewards: DUMMY_REWARDS,
    transactions: TRANSACTIONS,
  };
}
