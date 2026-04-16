export interface Task {
  id: number;
  title: string;
  cat: string;
  xp: number;
  status: 'pending' | 'done';
  deadline: string;
}

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Master STAR Method Response',
    cat: 'Behavioral',
    xp: 50,
    status: 'done',
    deadline: '2h left',
  },
  {
    id: 2,
    title: 'Understand React 19 Compiler',
    cat: 'Technical',
    xp: 100,
    status: 'pending',
    deadline: 'Today',
  },
  {
    id: 3,
    title: 'Solve 2 Binary Tree Challenges',
    cat: 'Technical',
    xp: 80,
    status: 'pending',
    deadline: 'Tomorrow',
  },
  {
    id: 4,
    title: 'Practice "Tell Me About Yourself"',
    cat: 'Soft Skills',
    xp: 40,
    status: 'done',
    deadline: 'Done',
  },
  {
    id: 5,
    title: 'Prepare System Design for Shopee',
    cat: 'Project',
    xp: 200,
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
