import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_EMPLOYEES = [
  {
    id: 1,
    name: 'Alice Freeman',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'New York, USA',
    email: 'alice@eplatform.com',
    status: 'Online',
    joinDate: '2022-03-15',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Product Manager',
    department: 'Product',
    location: 'London, UK',
    email: 'bob@eplatform.com',
    status: 'In a meeting',
    joinDate: '2023-01-10',
  },
  {
    id: 3,
    name: 'Charlie Davis',
    role: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    email: 'charlie@eplatform.com',
    status: 'Offline',
    joinDate: '2024-05-20',
  },
  {
    id: 4,
    name: 'Diana Prince',
    role: 'HR Director',
    department: 'Human Resources',
    location: 'New York, USA',
    email: 'diana@eplatform.com',
    status: 'Online',
    joinDate: '2021-11-05',
  },
  {
    id: 5,
    name: 'Evan Wright',
    role: 'Frontend Developer',
    department: 'Engineering',
    location: 'Berlin, DE',
    email: 'evan@eplatform.com',
    status: 'Online',
    joinDate: '2026-09-01',
  },
  {
    id: 6,
    name: 'Fiona Gallagher',
    role: 'Marketing Lead',
    department: 'Marketing',
    location: 'Remote',
    email: 'fiona@eplatform.com',
    status: 'Away',
    joinDate: '2025-08-14',
  },
];

export const DEPARTMENTS = [
  'All',
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Human Resources',
];

export function useDirectoryPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredEmployees = DUMMY_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      selectedDept === 'All' || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return {
    isAdmin,
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    filteredEmployees,
    departments: DEPARTMENTS,
  };
}
