import { Task } from '@/types/data';

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Master STAR Method Response',
    cat: 'Behavioral',
    status: 'done',
    deadline: '2h left',
  },
  {
    id: 2,
    title: 'Understand React 19 Compiler',
    cat: 'Technical',
    status: 'pending',
    deadline: 'Today',
  },
  {
    id: 3,
    title: 'Solve 2 Binary Tree Challenges',
    cat: 'Technical',
    status: 'pending',
    deadline: 'Tomorrow',
  },
  {
    id: 4,
    title: 'Practice "Tell Me About Yourself"',
    cat: 'Soft Skills',
    status: 'done',
    deadline: 'Done',
  },
  {
    id: 5,
    title: 'Prepare System Design for Shopee',
    cat: 'Project',
    status: 'pending',
    deadline: 'Next Week',
  },
];

export const taskCategories = [
  'All Tasks',
  'Technical',
  'Behavioral',
  'Soft Skills',
  'Project',
];
