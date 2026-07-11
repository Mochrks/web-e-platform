'use client';

import { useState } from 'react';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'Employee' | 'Admin' | 'Manager';
  status: 'Active' | 'Inactive' | 'Pending';
  lastSeen: string;
  department: string;
  avatarConfig: {
    skinColor?: string;
    mood?: 'happy' | 'smart' | 'focused';
  };
}

const MOCK_USERS: ManagedUser[] = [
  {
    id: 'emp-101',
    name: 'Moch Reks',
    email: 'moch.reks@e-platform.pro',
    role: 'Admin',
    status: 'Active',
    lastSeen: 'Just now',
    department: 'Technology',
    avatarConfig: { skinColor: '#fcc419', mood: 'happy' },
  },
  {
    id: 'emp-102',
    name: 'Sarah Jenkins',
    email: 'sarah.j@e-platform.pro',
    role: 'Employee',
    status: 'Active',
    lastSeen: '2 hours ago',
    department: 'Design',
    avatarConfig: { skinColor: '#f5deb3', mood: 'happy' },
  },
  {
    id: 'emp-103',
    name: 'David Chen',
    email: 'd.chen@e-platform.pro',
    role: 'Employee',
    status: 'Inactive',
    lastSeen: '3 days ago',
    department: 'Engineering',
    avatarConfig: { skinColor: '#d2a679', mood: 'focused' },
  },
  {
    id: 'emp-104',
    name: 'Elena Rodriguez',
    email: 'elena.r@e-platform.pro',
    role: 'Manager',
    status: 'Active',
    lastSeen: '10 mins ago',
    department: 'Human Resources',
    avatarConfig: {
      skinColor: '#a87c4f',
      mood: 'smart',
    },
  },
  {
    id: 'emp-105',
    name: 'Marcus Thorne',
    email: 'm.thorne@e-platform.pro',
    role: 'Employee',
    status: 'Pending',
    lastSeen: 'Never',
    department: 'Sales',
    avatarConfig: { skinColor: '#fcc419', mood: 'happy' },
  },
];

export function useUserManagementPageHook() {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users: filteredUsers,
    searchQuery,
    setSearchQuery,
    handleDeleteUser,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'Active').length,
  };
}
