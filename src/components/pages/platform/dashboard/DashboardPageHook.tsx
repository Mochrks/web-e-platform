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
      score: 'Completed',
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
    duration: '6 Months',
  };

  const upcomingTasks = [
    {
      title: 'Submit Weekly Timesheet',
      deadline: 'Today, 5:00 PM',
      type: 'Administrative',
    },
    {
      title: 'Complete GCP Certification Module',
      deadline: 'Tomorrow',
      type: 'Learning',
    },
    {
      title: 'Prepare for Q2 Appraisal',
      deadline: 'Next Week',
      type: 'Performance',
    },
  ];

  const attendanceStatus = {
    status: 'Clocked In',
    timeIn: '08:45 AM',
    hoursLogged: '4.5 hrs',
    pendingApprovals: 1,
  };

  return {
    recentActivities,
    skillBalance,
    currentAllocation,
    upcomingTasks,
    attendanceStatus,
  };
};
