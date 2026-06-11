import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_IC_TRACK = {
  currentLevel: 'Mid-Level Engineer (L3)',
  nextLevel: 'Senior Engineer (L4)',
  progress: 75,
  milestones: [
    {
      id: 1,
      title: 'Complete System Design Simulation',
      desc: 'Achieve a score of 85% or higher.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Lead a Project to Completion',
      desc: 'Acted as technical lead for Q3 Redesign.',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Mentor a Junior Developer',
      desc: 'Provide guidance and code reviews for 3 months.',
      status: 'in-progress',
    },
    {
      id: 4,
      title: 'AWS Solutions Architect Cert',
      desc: 'Pass the associate level exam.',
      status: 'pending',
    },
  ],
  recommendedCourses: [
    {
      id: 1,
      title: 'Advanced Cloud Architecture',
      hours: 12,
      type: 'Technical',
    },
    {
      id: 2,
      title: 'Leadership & Communication',
      hours: 4,
      type: 'Soft Skills',
    },
    {
      id: 3,
      title: 'Performance Optimization in React',
      hours: 6,
      type: 'Technical',
    },
  ],
};

export const DUMMY_MANAGEMENT_TRACK = {
  currentLevel: 'Tech Lead (M1)',
  nextLevel: 'Engineering Manager (M2)',
  progress: 40,
  milestones: [
    {
      id: 1,
      title: 'People Management Training',
      desc: 'Complete the 4-week internal HR course.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Conduct Performance Reviews',
      desc: 'Successfully complete a full review cycle for 3+ direct reports.',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Budget Planning Exercise',
      desc: 'Draft a Q4 budget proposal for the team.',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Cross-functional Leadership',
      desc: 'Lead an initiative involving Product & Design.',
      status: 'pending',
    },
  ],
  recommendedCourses: [
    { id: 1, title: 'Effective 1-on-1s', hours: 3, type: 'Management' },
    { id: 2, title: 'Conflict Resolution', hours: 5, type: 'Soft Skills' },
    {
      id: 3,
      title: 'Strategic Planning for Leaders',
      hours: 8,
      type: 'Leadership',
    },
  ],
};

export function useCareerPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [track, setTrack] = useState('Individual Contributor');

  return {
    isAdmin,
    track,
    setTrack,
    careerData:
      track === 'Management' ? DUMMY_MANAGEMENT_TRACK : DUMMY_IC_TRACK,
  };
}
