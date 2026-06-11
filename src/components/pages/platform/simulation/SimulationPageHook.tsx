'use client';

import { useState, useEffect } from 'react';
import { Answer } from './components/simulator/InterviewSimulatorHook';
import { InterviewStage } from '@/types/interview';

export const useSimulationPageHook = () => {
  const [stage, setStage] = useState<'setup' | 'simulating' | 'results'>(
    'setup'
  );
  const [activeTab, setActiveTab] = useState('practice');
  const [interviewName, setInterviewName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  // New state for tracking specific interview stages
  const [currentInterviewStage, setCurrentInterviewStage] =
    useState<InterviewStage>('behavioral');
  const [completedInterviewStages, setCompletedInterviewStages] = useState<
    InterviewStage[]
  >([]);

  // Mock Assigned Sessions
  const assignedSessions = [
    {
      id: 'SESS-001',
      role: 'Senior Frontend Developer',
      company: 'Shopee',
      deadline: 'Due in 2 days',
      code: 'SHP-FE-001',
      type: 'practice',
      isLocked: false,
    },
    {
      id: 'SESS-002',
      role: 'Fullstack Engineer',
      company: 'Gojek',
      deadline: 'Due in 5 days',
      code: 'GJK-FS-002',
      type: 'voice',
      isLocked: false,
    },
    {
      id: 'SESS-003',
      role: 'Backend Developer',
      company: 'Tokopedia',
      deadline: 'Due in 7 days',
      code: 'TKP-BE-003',
      type: 'practice',
      isLocked: true,
    },
  ];

  const handleStart = () => {
    if (!interviewName.trim() || !sessionCode.trim()) return;
    setStage('simulating');
  };

  const handleComplete = (finalAnswers: Answer[], score: number) => {
    setAnswers(finalAnswers);
    setOverallScore(score);
    setStage('results');
  };

  const handleRestart = () => {
    setStage('setup');
    setActiveTab('practice');
    setAnswers([]);
    setOverallScore(0);
    setInterviewName('');
    setSessionCode('');
    setCurrentInterviewStage('behavioral');
    setCompletedInterviewStages([]);
  };

  return {
    stage,
    activeTab,
    setActiveTab,
    interviewName,
    setInterviewName,
    sessionCode,
    setSessionCode,
    assignedSessions,
    answers,
    overallScore,
    currentInterviewStage,
    setCurrentInterviewStage,
    completedInterviewStages,
    setCompletedInterviewStages,
    handleStart,
    handleComplete,
    handleRestart,
  };
};
