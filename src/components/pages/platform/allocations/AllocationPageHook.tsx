'use client';

import { useState } from 'react';
import { Allocation } from '@/types/platform';
import { useAppSelector } from '@/store';

const MOCK_ALLOCATIONS: Allocation[] = [
  {
    id: 'all-001',
    employeeId: 'emp-101',
    employeeName: 'Moch Reks',
    clientName: 'Google Cloud Asia',
    projectName: 'Vertex AI Integration',
    role: 'Lead Architect',
    startDate: 'Jan 15, 2026',
    endDate: 'Dec 30, 2026',
    status: 'active',
    progress: 65,
    techStack: ['Next.js', 'Python', 'TensorFlow', 'Terraform'],
    reportingManager: 'Sarah Jenkins',
    allocationType: 'Full-time',
    location: 'Hybrid',
  },
  {
    id: 'all-002',
    employeeId: 'emp-101',
    employeeName: 'Moch Reks',
    clientName: 'DBS Bank',
    projectName: 'Legacy Migration',
    role: 'Senior Dev',
    startDate: 'Jun 01, 2025',
    endDate: 'Jan 10, 2026',
    status: 'completed',
    progress: 100,
    techStack: ['Java Spring', 'AWS', 'Kubernetes'],
    reportingManager: 'Michael Wong',
    allocationType: 'Full-time',
    location: 'On-site',
    performanceRating: 4.8,
    feedback: 'Exceptional delivery on complex legacy transformations.',
  },
  {
    id: 'all-102',
    employeeId: 'emp-102',
    employeeName: 'Elena Rodriguez',
    clientName: 'JP Morgan Chase',
    projectName: 'Secure Payments 2.0',
    role: 'Cybersecurity Analyst',
    startDate: 'Mar 01, 2026',
    endDate: 'Sep 15, 2026',
    status: 'active',
    progress: 42,
    techStack: ['SIEM', 'Crowdstrike', 'Python'],
    reportingManager: 'Admin',
    allocationType: 'Full-time',
    location: 'On-site',
  },
  {
    id: 'all-103',
    employeeId: 'emp-103',
    employeeName: 'David Chen',
    clientName: 'DBS Bank',
    projectName: 'API Gateway Refactor',
    role: 'Backend Dev',
    startDate: 'Feb 10, 2026',
    endDate: 'Jun 10, 2026',
    status: 'active',
    progress: 78,
    techStack: ['Go', 'gRPC', 'PostgreSQL'],
    reportingManager: 'Moch Reks',
    allocationType: 'Full-time',
    location: 'Remote',
  },
];

export function useAllocationsHook() {
  const { role } = useAppSelector((state) => state.auth);
  const [allocations] = useState<Allocation[]>(MOCK_ALLOCATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const currentEmployeeId = 'emp-101'; // Simulated

  const getEmployeeHistory = (empId: string) =>
    allocations.filter((a) => a.employeeId === empId);

  const filteredAll = allocations.filter(
    (a) =>
      a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    role,
    allAllocations: filteredAll,
    searchQuery,
    setSearchQuery,
    selectedUserId,
    setSelectedUserId,
    getEmployeeHistory,
    // For personal view
    personalCurrent: getEmployeeHistory(currentEmployeeId).find(
      (a) => a.status === 'active'
    ),
    personalHistory: getEmployeeHistory(currentEmployeeId).filter(
      (a) => a.status === 'completed'
    ),
  };
}
