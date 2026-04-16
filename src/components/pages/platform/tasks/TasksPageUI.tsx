'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  CheckSquare,
  Square,
  Trophy,
  Layout,
  ListChecks,
  Clock,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskStatBlock from './components/TaskStatBlock';
import SkillItem from '@/components/shared/SkillItem';
import { useTasksPageHook } from './TasksPageHook';

export default function TasksPageUI() {
  const {
    activeCategory,
    setActiveCategory,
    newTaskTitle,
    setNewTaskTitle,
    toggleTask,
    deleteTask,
    addTask,
    filteredTasks,
    stats,
    categories,
  } = useTasksPageHook();

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      {/* Header Stat Board */}
      <div className="bg-card border border-border p-10 rounded-[3rem] shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full w-fit">
            <ListChecks className="w-4 h-4" /> Goal Tracking
          </div>
          <h1 className="text-4xl font-black tracking-tight">Training Tasks</h1>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl leading-relaxed font-bold">
            Systematically improve your skills by completing daily challenges
            curated by our AI engine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-6 bg-primary text-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/30 min-w-[280px] group transition-all hover:scale-105">
            <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
              <Trophy className="w-10 h-10" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <span className="block text-xs font-black uppercase tracking-widest opacity-80">
                Total XP Gained
              </span>
              <span className="text-4xl font-black tabular-nums">
                {stats.totalXp}{' '}
                <span className="text-sm font-bold opacity-60">XP</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TaskStatBlock
              label="Completed"
              value={stats.completed.toString()}
              color="text-indigo-500"
            />
            <TaskStatBlock
              label="Pending"
              value={stats.pending.toString()}
              color="text-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* Main Task List */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                        px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap
                        ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-muted/50 text-muted-foreground hover:bg-muted font-black uppercase tracking-widest text-[10px]'}
                      `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Quick Add Form */}
            <div className="bg-card border-2 border-dashed border-border p-4 rounded-3xl flex gap-3 focus-within:border-primary transition-all">
              <Input
                placeholder="Quick add a new learning task..."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 font-bold"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <Button
                onClick={addTask}
                className="rounded-xl px-6 h-12 bg-primary text-white font-bold"
              >
                Add Task
              </Button>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground font-bold">
                No tasks found in this category.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group bg-card border border-border p-6 rounded-[2.5rem] flex items-center gap-6 transition-all hover:bg-muted/20 hover:border-primary/20 ${task.status === 'done' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label={
                      task.status === 'done'
                        ? 'Mark as pending'
                        : 'Mark as done'
                    }
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${task.status === 'done' ? 'bg-primary text-white' : 'border-2 border-border hover:border-primary/50 text-transparent'}`}
                  >
                    {task.status === 'done' ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 space-y-1">
                    <p
                      className={`text-xl font-bold tracking-tight transition-all ${task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground hover:text-primary cursor-pointer'}`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <span className="bg-muted px-3 py-1 rounded-lg text-primary">
                        {task.cat}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-black text-primary px-4 py-2 bg-primary/5 rounded-full">
                      +{task.xp} XP
                    </span>
                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="ghost"
                      size="icon"
                      className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-500 hover:bg-rose-500/10"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-full xl:w-96 space-y-8">
          <Card className="p-8 rounded-[2.5rem] border-border bg-gradient-to-br from-indigo-600 to-primary text-white shadow-xl shadow-primary/20">
            <h4 className="text-xl font-black mb-6">Expert Streak 🔥</h4>
            <p className="font-bold text-3xl mb-4">
              05{' '}
              <span className="text-sm opacity-80 uppercase tracking-widest">
                Days
              </span>
            </p>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              Keep it up! Reach 7 days to unlock a Premium Mentorship session.
            </p>
            <div className="mt-8 flex gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${i < 5 ? 'bg-white text-primary' : 'bg-white/10 text-white/40 border border-white/20'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 rounded-[3rem] border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <Layout className="w-5 h-5 text-primary" />
              <h4 className="text-xl font-black">Skill Focus</h4>
            </div>
            <div className="space-y-6">
              <SkillItem label="DSA Logic" percent={82} />
              <SkillItem label="Communication" percent={45} />
              <SkillItem label="Product Design" percent={60} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
