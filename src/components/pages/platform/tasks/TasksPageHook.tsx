'use client';

import { useState } from 'react';
import { initialTasks, Task, taskCategories } from '@/data/tasksData';

export const useTasksPageHook = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeCategory, setActiveCategory] = useState('All Tasks');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
          : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      cat: 'Technical',
      xp: 50,
      status: 'pending',
      deadline: 'New',
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const filteredTasks =
    activeCategory === 'All Tasks'
      ? tasks
      : tasks.filter((t) => t.cat === activeCategory);

  const stats = {
    totalXp: tasks.reduce(
      (acc, t) => (t.status === 'done' ? acc + t.xp : acc),
      0
    ),
    completed: tasks.filter((t) => t.status === 'done').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
  };

  return {
    tasks,
    activeCategory,
    setActiveCategory,
    newTaskTitle,
    setNewTaskTitle,
    toggleTask,
    deleteTask,
    addTask,
    filteredTasks,
    stats,
    categories: taskCategories,
  };
};
