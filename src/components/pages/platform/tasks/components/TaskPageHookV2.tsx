'use client';

import { useState } from 'react';
import { Task, TaskAttempt } from '@/types/platform';

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Secure API Implementation',
    description:
      'Implement OAuth2 and JWT authentication for the internal employee portal.',
    category: 'Backend Architecture',
    difficulty: 'hard',
    baseXP: 500,
    deadline: '2026-05-30',
    maxAttempts: 3,
  },
  {
    id: 't2',
    title: 'Customer Feedback Analysis',
    description:
      'Analyze Q1 sentiment data and generate a comprehensive dashboard.',
    category: 'Data Analytics',
    difficulty: 'medium',
    baseXP: 300,
    deadline: '2026-05-15',
    maxAttempts: 5,
  },
];

export function useTasksHook() {
  const [tasks] = useState<Task[]>(MOCK_TASKS);
  const [attempts, setAttempts] = useState<TaskAttempt[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleLaunchTask = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleCompleteAttempt = (taskId: string, score: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const previousAttempts = attempts.filter((a) => a.taskId === taskId);
    const attemptNumber = previousAttempts.length + 1;

    // XP Calculation Logic (Moodle style - harder tasks/better scores = more XP)
    const xpEarned = Math.floor((score / 100) * task.baseXP);

    const newAttempt: TaskAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      taskId,
      employeeId: 'current-user',
      attemptNumber,
      score,
      maxScore: 100,
      xpEarned,
      completedAt: new Date().toISOString(),
      status: score >= 70 ? 'passed' : 'failed',
    };

    setAttempts((prev) => [...prev, newAttempt]);
    setSelectedTask(null);
  };

  return {
    tasks,
    attempts,
    selectedTask,
    handleLaunchTask,
    handleCompleteAttempt,
  };
}
