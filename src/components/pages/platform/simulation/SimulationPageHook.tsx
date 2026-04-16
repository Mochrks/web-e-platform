'use client';

import { useState } from 'react';
import { Answer } from './components/interview/simulator/InterviewSimulatorHook';

export const useSimulationPageHook = () => {
  const [stage, setStage] = useState<'setup' | 'simulating' | 'results'>(
    'setup'
  );
  const [interviewName, setInterviewName] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [overallScore, setOverallScore] = useState(0);

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
  };

  return {
    stage,
    interviewName,
    setInterviewName,
    answers,
    overallScore,
    handleStart,
    handleComplete,
    handleRestart,
  };
};
