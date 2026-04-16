import { createSlice } from '@reduxjs/toolkit';

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

interface SidebarState {
  employeeMenu: MenuItem[];
  adminMenu: MenuItem[];
}

const initialState: SidebarState = {
  employeeMenu: [
    {
      title: 'Dashboard',
      path: '/platform/dashboard',
      icon: 'LayoutDashboard',
    },
    { title: 'Leaderboard', path: '/platform/leaderboard', icon: 'Trophy' },
    {
      title: 'My Allocations',
      path: '/platform/allocations',
      icon: 'Briefcase',
    },
    {
      title: 'Certifications',
      path: '/platform/certifications',
      icon: 'Award',
    },
    { title: 'Tasks', path: '/platform/tasks', icon: 'CheckSquare' },
    { title: 'Attendance', path: '/platform/attendance', icon: 'Clock' },
    { title: 'Video Meetings', path: '/platform/meetings', icon: 'Video' },
    { title: 'Schedule', path: '/platform/calendar', icon: 'Calendar' },
    { title: 'My Notes', path: '/platform/notes', icon: 'FileText' },
    {
      title: 'Platform Settings',
      path: '/platform/settings',
      icon: 'Settings',
    },
  ],
  adminMenu: [
    {
      title: 'Admin Dashboard',
      path: '/platform/dashboard',
      icon: 'LayoutDashboard',
    },
    { title: 'Allocations', path: '/platform/allocations', icon: 'Briefcase' },
    {
      title: 'Certifications',
      path: '/platform/certifications',
      icon: 'Award',
    },
    { title: 'Leaderboard', path: '/platform/leaderboard', icon: 'Trophy' },
    { title: 'Monitoring', path: '/platform/monitoring', icon: 'BarChart3' },
    { title: 'User Management', path: '/platform/users', icon: 'Users' },
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
