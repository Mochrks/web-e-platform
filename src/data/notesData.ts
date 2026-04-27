export interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  tag: string;
  color: string;
  isStarred: boolean;
}

export const initialNotes: Note[] = [
  {
    id: 1,
    title: 'System Design: Load Balancers',
    content:
      'Round robin vs Least connections. Remember to mention health checks...',
    date: new Date('2025-10-24'),
    tag: 'Technical',
    color: 'bg-primary/5 border-primary/20',
    isStarred: true,
  },
  {
    id: 2,
    title: 'STAR Method: Conflict Resolve',
    content:
      'Situation: Team disagreement on React vs Vue. Task: Decide tech stack...',
    date: new Date('2025-10-23'),
    tag: 'Behavioral',
    color: 'bg-indigo-500/5 border-indigo-500/20',
    isStarred: false,
  },
  {
    id: 3,
    title: 'Feedback: Mock Call #4',
    content:
      "Focus on speaking slower. Don't forget to thank the interviewer...",
    date: new Date('2025-10-22'),
    tag: 'Mentor',
    color: 'bg-pink-500/5 border-pink-500/20',
    isStarred: false,
  },
  {
    id: 4,
    title: 'React 19 Hooks',
    content:
      'useActionState, useFormStatus, and the new use() hook for preloading data...',
    date: new Date('2025-10-20'),
    tag: 'Technical',
    color: 'bg-emerald-500/5 border-emerald-500/20',
    isStarred: true,
  },
];

export const noteCollections = [
  { label: 'All Notes' },
  { label: 'Technical Prep' },
  { label: 'Behavioral Tips' },
  { label: 'Mentor Feedback' },
];
