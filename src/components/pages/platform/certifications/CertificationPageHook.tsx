'use client';

import { useState } from 'react';
import { Certification } from '@/types/platform';

const MOCK_CERTS: Certification[] = [
  {
    id: 'c1',
    title: 'AWS Certified Cloud Practitioner',
    provider: 'Amazon Web Services',
    description:
      'Master the fundamental concepts of AWS Cloud, including services, security, and architecture.',
    points: 800,
    duration: '4-6 Weeks',
    status: 'available',
  },
  {
    id: 'c2',
    title: 'Google Professional Data Engineer',
    provider: 'Google Cloud',
    description:
      'Design, build, and operationalize machine learning and data processing systems.',
    points: 1500,
    duration: '8-12 Weeks',
    status: 'ongoing',
    enrolledDate: '2026-03-15',
  },
  {
    id: 'c3',
    title: 'Certified Ethical Hacker (CEH)',
    provider: 'EC-Council',
    description:
      'Learn the techniques and tools used by hackers to test system vulnerabilities.',
    points: 1200,
    duration: '4 Weeks',
    status: 'available',
  },
  {
    id: 'c4',
    title: 'Microsoft Azure Solutions Architect',
    provider: 'Microsoft',
    description: 'Design and implement solutions that run on Microsoft Azure.',
    points: 1300,
    duration: '10 Weeks',
    status: 'available',
  },
  {
    id: 'c5',
    title: 'CompTIA Security+',
    provider: 'CompTIA',
    description:
      'Establish the core knowledge required of any cybersecurity role.',
    points: 900,
    duration: '6 Weeks',
    status: 'completed',
  },
  {
    id: 'c6',
    title: 'Project Management Professional (PMP)',
    provider: 'PMI',
    description:
      'Master the global standard for project management excellence.',
    points: 2000,
    duration: '12-16 Weeks',
    status: 'available',
  },
];

import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export function useCertificationsHook() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [certs, setCerts] = useState<Certification[]>(MOCK_CERTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [certTitle, setCertTitle] = useState('');
  const [certProvider, setCertProvider] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [certPoints, setCertPoints] = useState('');
  const [certDuration, setCertDuration] = useState('');

  const handleEnroll = (id: string) => {
    setCerts((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'ongoing', enrolledDate: new Date().toISOString() }
          : c
      )
    );
  };

  const openCreateModal = () => {
    setEditingId(null);
    setCertTitle('');
    setCertProvider('');
    setCertDesc('');
    setCertPoints('');
    setCertDuration('');
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certification) => {
    setEditingId(cert.id);
    setCertTitle(cert.title);
    setCertProvider(cert.provider);
    setCertDesc(cert.description);
    setCertPoints(cert.points.toString());
    setCertDuration(cert.duration);
    setIsModalOpen(true);
  };

  const handleSubmitCert = () => {
    if (editingId) {
      setCerts((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                title: certTitle,
                provider: certProvider,
                description: certDesc,
                points: parseInt(certPoints) || 0,
                duration: certDuration,
              }
            : c
        )
      );
    } else {
      const newCert: Certification = {
        id: `c${Date.now()}`,
        title: certTitle,
        provider: certProvider,
        description: certDesc,
        points: parseInt(certPoints) || 0,
        duration: certDuration,
        status: 'available',
      };
      setCerts([newCert, ...certs]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCert = (id: string) => {
    setCerts((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    isAdmin,
    certs,
    handleEnroll,
    totalCompleted: certs.filter((c) => c.status === 'completed').length,
    activePoints: certs.reduce(
      (acc, c) => acc + (c.status === 'completed' ? c.points : 0),
      0
    ),
    isModalOpen,
    setIsModalOpen,
    certTitle,
    setCertTitle,
    certProvider,
    setCertProvider,
    certDesc,
    setCertDesc,
    certPoints,
    setCertPoints,
    certDuration,
    setCertDuration,
    openCreateModal,
    openEditModal,
    handleSubmitCert,
    handleDeleteCert,
  };
}
