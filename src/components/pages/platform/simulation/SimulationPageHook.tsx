'use client';

import { useState } from 'react';
import { Answer } from './components/simulator/InterviewSimulatorHook';
import { InterviewStage } from '@/data/interviewData';

export const useSimulationPageHook = () => {
  const [stage, setStage] = useState<'setup' | 'simulating' | 'results'>(
    'setup'
  );
  const [interviewName, setInterviewName] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  // New state for tracking specific interview stages
  const [currentInterviewStage, setCurrentInterviewStage] =
    useState<InterviewStage>('behavioral');
  const [completedInterviewStages, setCompletedInterviewStages] = useState<
    InterviewStage[]
  >([]);

  const handleStart = () => {
    if (!interviewName.trim()) return;
    setStage('simulating');
  };

  const handleComplete = (finalAnswers: Answer[], score: number) => {
    setAnswers(finalAnswers);
    setOverallScore(score);
    setStage('results');
  };

  const handleRestart = () => {
    setStage('setup');
    setAnswers([]);
    setOverallScore(0);
    setInterviewName('');
    setCurrentInterviewStage('behavioral');
    setCompletedInterviewStages([]);
  };

  return {
    stage,
    interviewName,
    setInterviewName,
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
