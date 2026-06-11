import { createSlice } from '@reduxjs/toolkit';

import { SidebarState } from '@/types/sidebar';

const initialState: SidebarState = {
  employeeMenu: [
    // --- Overview & Company ---
    {
      title: 'Dashboard',
      path: '/platform/dashboard',
      icon: 'LayoutDashboard',
    },
    { title: 'Announcements', path: '/platform/news', icon: 'Megaphone' },
    {
      title: 'Company Directory',
      path: '/platform/directory',
      icon: 'Network',
    },

    // --- Work & Collaboration ---
    { title: 'Tasks', path: '/platform/tasks', icon: 'CheckSquare' },
    { title: 'Projects', path: '/platform/projects', icon: 'Layers' },
    { title: 'Schedule', path: '/platform/calendar', icon: 'Calendar' },
    { title: 'Video Meetings', path: '/platform/meetings', icon: 'Video' },
    { title: 'My Notes', path: '/platform/notes', icon: 'FileText' },

    // --- Time & Assignments ---
    { title: 'Attendance', path: '/platform/attendance', icon: 'Clock' },
    { title: 'Timesheets', path: '/platform/timesheets', icon: 'Timer' },
    {
      title: 'My Allocations',
      path: '/platform/allocations',
      icon: 'Briefcase',
    },

    // --- Performance & Career ---
    {
      title: 'My Performance',
      path: '/platform/performance',
      icon: 'PieChart',
    },
    {
      title: 'Peer Feedback',
      path: '/platform/feedback',
      icon: 'MessageSquare',
    },
    { title: 'Career Path', path: '/platform/career', icon: 'TrendingUp' },

    // --- Learning & Gamification ---
    { title: 'Knowledge Base', path: '/platform/library', icon: 'Library' },
    {
      title: 'Certifications',
      path: '/platform/certifications',
      icon: 'Award',
    },
    { title: 'AI Simulation', path: '/platform/simulation', icon: 'Zap' },
    { title: 'Leaderboard', path: '/platform/leaderboard', icon: 'Trophy' },
    { title: 'Rewards', path: '/platform/rewards', icon: 'Gift' },

    // --- Support & System ---
    { title: 'IT Support', path: '/platform/support', icon: 'LifeBuoy' },
    {
      title: 'Platform Settings',
      path: '/platform/settings',
      icon: 'Settings',
    },
  ],
  adminMenu: [
    // --- Overview & Users ---
    {
      title: 'Admin Dashboard',
      path: '/platform/dashboard',
      icon: 'LayoutDashboard',
    },
    { title: 'Monitoring', path: '/platform/monitoring', icon: 'BarChart3' },
    { title: 'User Management', path: '/platform/users', icon: 'Users' },
    {
      title: 'Company Directory',
      path: '/platform/directory',
      icon: 'Network',
    },

    // --- Content & Comms ---
    { title: 'Announcements', path: '/platform/news', icon: 'Megaphone' },
    { title: 'Knowledge Base', path: '/platform/library', icon: 'Library' },

    // --- Operations & HR ---
    { title: 'Allocations', path: '/platform/allocations', icon: 'Briefcase' },
    {
      title: 'Certifications',
      path: '/platform/certifications',
      icon: 'Award',
    },
    { title: 'Leaderboard', path: '/platform/leaderboard', icon: 'Trophy' },
    { title: 'Rewards', path: '/platform/rewards', icon: 'Gift' },

    // --- System & Support ---
    { title: 'IT Support', path: '/platform/support', icon: 'LifeBuoy' },
    {
      title: 'Platform Settings',
      path: '/platform/settings',
      icon: 'Settings',
    },
  ],
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
});

export default sidebarSlice.reducer;
