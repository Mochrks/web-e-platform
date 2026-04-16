'use client';

export const useDashboardPageHook = () => {
  const recentActivities = [
    {
      title: 'Technical Assessment',
      time: '2 hours ago',
      type: 'Assessment',
      score: '92%',
    },
    {
      title: 'System Design Interview',
      time: 'Yesterday',
      type: 'Meeting',
      score: 'Passed',
    },
    {
      title: 'Cloud Certification Quiz',
      time: '2 days ago',
      type: 'Task',
      score: '+150 XP',
    },
  ];

  const skillBalance = [
    { label: 'Technical Proficiency', percent: 85 },
    { label: 'System Design', percent: 72 },
    { label: 'Soft Skills', percent: 90 },
    { label: 'Problem Solving', percent: 88 },
  ];

  const currentAllocation = {
    client: 'Google Cloud Asia',
    status: 'At Client',
    project: 'Vertex AI Integration',
    role: 'Lead Architect',
  };

  return {
    recentActivities,
    skillBalance,
    currentAllocation,
  };
};
