import { addDays } from 'date-fns';

export interface Session {
  id: number;
  title: string;
  time: string;
  mentor: string;
  type: string;
  location: string;
  date: Date;
}

export const initialSessions: Session[] = [
  {
    id: 1,
    title: 'Mock Interview: System Design',
    time: '10:00 AM - 11:30 AM',
    mentor: 'Senior Eng. John',
    type: 'Technical',
    location: 'Video Room 1',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Behavioral Prep with HR',
    time: '02:00 PM - 03:00 PM',
    mentor: 'Sarah HR',
    type: 'Interpersonal',
    location: 'Video Room 3',
    date: new Date(),
  },
  {
    id: 3,
    title: 'Peer-to-Peer Coding',
    time: '04:00 PM - 05:30 PM',
    mentor: 'Talent Group B',
    type: 'Coding',
    location: 'Simulation Hub',
    date: new Date(),
  },
  {
    id: 4,
    title: 'Architecture Review',
    time: '09:00 AM - 10:30 AM',
    mentor: 'Chief Architect',
    type: 'Technical',
    location: 'Video Room 2',
    date: addDays(new Date(), 1),
  },
  {
    id: 5,
    title: 'Salary Negotiation Prep',
    time: '11:00 AM - 12:00 PM',
    mentor: 'Recruiter Mike',
    type: 'Interpersonal',
    location: 'Simulation Hub',
    date: addDays(new Date(), 3),
  },
];
