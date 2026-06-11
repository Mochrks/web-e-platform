import { useState } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export interface TimesheetEntry {
  id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
  status: 'Draft' | 'Submitted';
}

const INITIAL_DATA: TimesheetEntry[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    hours: 4,
    project: 'Website Redesign',
    description: 'Working on UI mockups',
    status: 'Draft',
  },
  {
    id: '2',
    date: new Date().toISOString().split('T')[0],
    hours: 4,
    project: 'Mobile App V2',
    description: 'API integration',
    status: 'Draft',
  },
];

export function useTimesheetsPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [entries, setEntries] = useState<TimesheetEntry[]>(INITIAL_DATA);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const filteredEntries = entries.filter((e) => e.date === selectedDate);
  const totalHours = filteredEntries.reduce((acc, curr) => acc + curr.hours, 0);

  const handleAdd = (entry: Omit<TimesheetEntry, 'id' | 'status'>) => {
    setEntries([
      ...entries,
      { ...entry, id: Math.random().toString(), status: 'Draft' },
    ]);
  };

  const handleEdit = (id: string, updated: Partial<TimesheetEntry>) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleSubmitDay = () => {
    setEntries(
      entries.map((e) =>
        e.date === selectedDate ? { ...e, status: 'Submitted' } : e
      )
    );
  };

  return {
    isAdmin,
    selectedDate,
    setSelectedDate,
    filteredEntries,
    totalHours,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmitDay,
  };
}
